import os

import cv2
import numpy as np
import torch

from transformers import (
    VideoMAEForVideoClassification,
    VideoMAEImageProcessor
)


class VideoDetector:

    MODEL_ID = (
        "Vansh180/"
        "VideoMae-ffc23-deepfake-detector"
    )

    NUM_FRAMES = 16
    MAX_CLIPS = 4

    def __init__(self):

        print()
        print("=" * 60)
        print("Loading VideoMAE Video Detection Model")
        print("=" * 60)

        # --------------------------------------------------
        # Device
        # --------------------------------------------------

        self.device = torch.device(
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        print(
            "Using Device:",
            self.device
        )

        if self.device.type == "cuda":

            print(
                "GPU:",
                torch.cuda.get_device_name(0)
            )

            total_vram = (
                torch.cuda.get_device_properties(0)
                .total_memory
                / (1024 ** 3)
            )

            print(
                f"VRAM: {total_vram:.2f} GB"
            )

        # --------------------------------------------------
        # Local model directory
        # --------------------------------------------------

        backend_dir = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                ".."
            )
        )

        self.model_dir = os.path.join(
            backend_dir,
            "models",
            "video",
            "videomae"
        )

        os.makedirs(
            self.model_dir,
            exist_ok=True
        )

        print(
            "Model cache:",
            self.model_dir
        )

        # --------------------------------------------------
        # Load processor
        # --------------------------------------------------

        print()
        print("Loading VideoMAE processor...")

        self.processor = (
            VideoMAEImageProcessor
            .from_pretrained(
                self.MODEL_ID,
                cache_dir=self.model_dir
            )
        )

        # --------------------------------------------------
        # Select model dtype
        # --------------------------------------------------

        if self.device.type == "cuda":

            self.dtype = torch.float16

        else:

            self.dtype = torch.float32

        print(
            "Model dtype:",
            self.dtype
        )

        # --------------------------------------------------
        # Load model
        # --------------------------------------------------

        print()
        print("Downloading/loading VideoMAE model...")

        self.model = (
            VideoMAEForVideoClassification
            .from_pretrained(
                self.MODEL_ID,
                cache_dir=self.model_dir,
                torch_dtype=self.dtype
            )
        )

        self.model.to(
            self.device # type: ignore
        )

        self.model.eval()

        # --------------------------------------------------
        # Label mapping
        # --------------------------------------------------

        self.id2label = (
            self.model.config.id2label
        )

        print(
            "Label Mapping:",
            self.id2label
        )

        print()
        print(
            "VideoMAE Model Loaded Successfully!"
        )
        print("=" * 60)

    # ======================================================
    # PUBLIC API
    # ======================================================

    def analyze(
        self,
        video_path
    ):

        if not os.path.isfile(
            video_path
        ):

            raise FileNotFoundError(
                f"Video not found:\n{video_path}"
            )

        print()
        print("=" * 60)
        print(
            "VIDEO ANALYSIS"
        )
        print("=" * 60)

        print(
            "Video:",
            video_path
        )

        # --------------------------------------------------
        # Extract clips
        # --------------------------------------------------

        clips = self.extract_clips(
            video_path
        )

        if not clips:

            raise ValueError(
                "Could not extract enough frames "
                "from the video."
            )

        print(
            f"Clips extracted: {len(clips)}"
        )

        # --------------------------------------------------
        # Analyze each clip
        # --------------------------------------------------

        clip_results = []

        for index, clip in enumerate(
            clips,
            start=1
        ):

            print(
                f"\nAnalyzing clip "
                f"{index}/{len(clips)}..."
            )

            result = self.predict_clip(
                clip["frames"]
            )

            clip_result = {

                "clip_index":
                    index,

                "start_frame":
                    clip["start_frame"],

                "timestamp":
                    round(
                        clip["timestamp"],
                        3
                    ),

                "real_probability":
                    round(
                        result["real"],
                        4
                    ),

                "fake_probability":
                    round(
                        result["fake"],
                        4
                    )
            }

            clip_results.append(
                clip_result
            )

            print(
                f"Real: "
                f"{result['real'] * 100:.2f}%"
            )

            print(
                f"Fake: "
                f"{result['fake'] * 100:.2f}%"
            )

        # --------------------------------------------------
        # Aggregate results
        # --------------------------------------------------

        fake_scores = np.array(
            [
                clip["fake_probability"]
                for clip in clip_results
            ],
            dtype=np.float32
        )

        fake_score = self.aggregate_scores(
            fake_scores
        )

        real_score = 1.0 - fake_score

        # --------------------------------------------------
        # Prediction
        # --------------------------------------------------

        if fake_score >= 0.50:

            prediction = "FAKE"

        else:

            prediction = "REAL"

        confidence = max(
            fake_score,
            real_score
        )

        # --------------------------------------------------
        # Suspicious clips
        # --------------------------------------------------

        suspicious_clips = [

            clip

            for clip in clip_results

            if clip["fake_probability"] >= 0.70

        ]

        # --------------------------------------------------
        # Risk level
        # --------------------------------------------------

        risk_level = self.get_risk_level(
            fake_score
        )

        # --------------------------------------------------
        # Final result
        # --------------------------------------------------

        result = {

            "modality":
                "video",

            "prediction":
                prediction,

            "score":
                round(
                    fake_score * 100,
                    2
                ),

            "confidence":
                round(
                    confidence * 100,
                    2
                ),

            "risk_level":
                risk_level,

            "clips_analyzed":
                len(clip_results),

            "clip_results":
                clip_results,

            "suspicious_clips":
                suspicious_clips
        }

        # --------------------------------------------------
        # Print result
        # --------------------------------------------------

        print()
        print("=" * 60)
        print("VIDEO DETECTION RESULTS")
        print("=" * 60)

        print(
            "Prediction:",
            prediction
        )

        print(
            "Suspicion Score:",
            f"{fake_score * 100:.2f}%"
        )

        print(
            "Confidence:",
            f"{confidence * 100:.2f}%"
        )

        print(
            "Risk Level:",
            risk_level
        )

        print(
            "Clips Analyzed:",
            len(clip_results)
        )

        print("=" * 60)

        return result

    # ======================================================
    # VIDEO CLIP EXTRACTION
    # ======================================================

    def extract_clips(
        self,
        video_path
    ):

        capture = cv2.VideoCapture(
            video_path
        )

        if not capture.isOpened():

            raise ValueError(
                "OpenCV could not open the video."
            )

        total_frames = int(
            capture.get(
                cv2.CAP_PROP_FRAME_COUNT
            )
        )

        fps = capture.get(
            cv2.CAP_PROP_FPS
        )

        if fps <= 0:

            fps = 30.0

        print(
            "Total frames:",
            total_frames
        )

        print(
            "FPS:",
            round(fps, 2)
        )

        if total_frames < self.NUM_FRAMES:

            capture.release()

            return []

        # --------------------------------------------------
        # Determine possible clip starting positions
        # --------------------------------------------------

        possible_starts = (
            total_frames
            - self.NUM_FRAMES
            + 1
        )

        # --------------------------------------------------
        # Sample at most MAX_CLIPS clips
        # --------------------------------------------------

        if possible_starts <= self.MAX_CLIPS:

            starts = np.arange(
                possible_starts
            )

        else:

            starts = np.linspace(
                0,
                possible_starts - 1,
                self.MAX_CLIPS,
                dtype=int
            )

        clips = []

        for start in starts:

            frames = []

            for offset in range(
                self.NUM_FRAMES
            ):

                frame_index = (
                    int(start)
                    + offset
                )

                capture.set(
                    cv2.CAP_PROP_POS_FRAMES,
                    frame_index
                )

                success, frame = (
                    capture.read()
                )

                if not success:

                    break

                # ------------------------------------------
                # BGR → RGB
                # ------------------------------------------

                frame = cv2.cvtColor(
                    frame,
                    cv2.COLOR_BGR2RGB
                )

                frames.append(
                    frame
                )

            if len(frames) == self.NUM_FRAMES:

                clips.append({

                    "frames":
                        frames,

                    "start_frame":
                        int(start),

                    "timestamp":
                        float(
                            start / fps
                        )
                })

        capture.release()

        return clips

    # ======================================================
    # SINGLE CLIP PREDICTION
    # ======================================================

    def predict_clip(
        self,
        frames
    ):

        # --------------------------------------------------
        # VideoMAE expects 16 frames
        # --------------------------------------------------

        if len(frames) != self.NUM_FRAMES:

            raise ValueError(
                f"Expected {self.NUM_FRAMES} "
                f"frames, got {len(frames)}"
            )

        # --------------------------------------------------
        # Convert frames into processor input
        # --------------------------------------------------

        inputs = self.processor(
            frames,
            return_tensors="pt"
        )

        pixel_values = (
            inputs["pixel_values"]
        )

        # --------------------------------------------------
        # Move to GPU
        # --------------------------------------------------

        pixel_values = pixel_values.to(
            self.device
        )

        # --------------------------------------------------
        # Match model precision
        # --------------------------------------------------

        if self.device.type == "cuda":

            pixel_values = pixel_values.half()

        # --------------------------------------------------
        # Inference
        # --------------------------------------------------

        with torch.inference_mode():

            outputs = self.model(
                pixel_values=pixel_values
            )

        # --------------------------------------------------
        # Softmax
        # --------------------------------------------------

        probabilities = torch.softmax(
            outputs.logits,
            dim=-1
        )[0]

        # --------------------------------------------------
        # Get labels safely
        # --------------------------------------------------

        real_index = self.get_label_index(
            "real"
        )

        fake_index = self.get_label_index(
            "fake"
        )

        real_probability = float(
            probabilities[
                real_index
            ].detach().cpu()
        )

        fake_probability = float(
            probabilities[
                fake_index
            ].detach().cpu()
        )

        return {

            "real":
                real_probability,

            "fake":
                fake_probability
        }

    # ======================================================
    # LABEL HANDLING
    # ======================================================

    def get_label_index(
        self,
        target_label
    ):

        for index, label in (
            self.id2label.items() # type: ignore
        ):

            if label.lower() == target_label:

                return int(index)

        raise ValueError(
            f"Could not find label "
            f"'{target_label}' in "
            f"{self.id2label}"
        )

    # ======================================================
    # SCORE AGGREGATION
    # ======================================================

    def aggregate_scores(
        self,
        scores
    ):

        if len(scores) == 0:

            return 0.0

        mean_score = float(
            np.mean(scores)
        )

        max_score = float(
            np.max(scores)
        )

        # --------------------------------------------------
        # Mostly trust the average, but preserve a strong
        # suspicious segment.
        # --------------------------------------------------

        final_score = (
            0.70 * mean_score
            +
            0.30 * max_score
        )

        return float(
            np.clip(
                final_score,
                0.0,
                1.0
            )
        )

    # ======================================================
    # RISK LEVEL
    # ======================================================

    def get_risk_level(
        self,
        score
    ):

        if score >= 0.80:

            return "HIGH"

        if score >= 0.50:

            return "MEDIUM"

        return "LOW"