import os
from datetime import datetime


class UnifiedAnalyzer:

    def __init__(
        self,
        text_detector=None,
        video_detector=None,
        image_detector=None,
        audio_detector=None
    ):
        self.text_detector = text_detector
        self.video_detector = video_detector
        self.image_detector = image_detector
        self.audio_detector = audio_detector

        print("\n========================================")
        print("       UNIFIED ANALYZER INITIALIZED")
        print("========================================")

        print(
            "Text Detector :",
            "READY" if text_detector else "NOT AVAILABLE"
        )

        print(
            "Video Detector:",
            "READY" if video_detector else "NOT AVAILABLE"
        )

        print(
            "Image Detector:",
            "READY" if image_detector else "NOT AVAILABLE"
        )

        print(
            "Audio Detector:",
            "READY" if audio_detector else "NOT AVAILABLE"
        )

        print("========================================\n")

    # =========================================================
    # MAIN ANALYSIS FUNCTION
    # =========================================================

    def analyze(self, modality, data):

        modality = modality.lower().strip()

        if modality == "text":

            result = self._analyze_text(data)

        elif modality == "video":

            result = self._analyze_video(data)

        elif modality == "image":

            result = self._analyze_image(data)

        elif modality == "audio":

            result = self._analyze_audio(data)

        else:

            raise ValueError(
                f"Unsupported modality: {modality}"
            )

        return self._build_final_result(
            modality,
            result
        )

    # =========================================================
    # TEXT
    # =========================================================

    def _analyze_text(self, text):

        if self.text_detector is None:

            raise RuntimeError(
                "Text detector is not available."
            )

        return self.text_detector.analyze(
            text
        )

    # =========================================================
    # VIDEO
    # =========================================================

    def _analyze_video(self, video_path):

        if self.video_detector is None:

            raise RuntimeError(
                "Video detector is not available."
            )

        if not os.path.exists(video_path):

            raise FileNotFoundError(
                f"Video not found: {video_path}"
            )

        return self.video_detector.analyze(
            video_path
        )

    # =========================================================
    # IMAGE
    # =========================================================

    def _analyze_image(self, image_path):

        if self.image_detector is None:

            raise RuntimeError(
                "Image detector is not available."
            )

        if not os.path.exists(image_path):

            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        return self.image_detector.analyze(
            image_path
        )

    # =========================================================
    # AUDIO
    # =========================================================

    def _analyze_audio(self, audio_path):

        if self.audio_detector is None:

            raise RuntimeError(
                "Audio detector is not available."
            )

        if not os.path.exists(audio_path):

            raise FileNotFoundError(
                f"Audio not found: {audio_path}"
            )

        return self.audio_detector.analyze(
            audio_path
        )

    # =========================================================
    # BUILD UNIFIED RESULT
    # =========================================================

    def _build_final_result(
        self,
        modality,
        detector_result
    ):

        result = dict(detector_result)

        # -----------------------------------------------------
        # Basic fields
        # -----------------------------------------------------

        score = self._safe_float(
            result.get("score", 0)
        )

        confidence = self._safe_float(
            result.get("confidence", 0)
        )

        prediction = result.get(
            "prediction"
        )

        # -----------------------------------------------------
        # Prediction fallback
        # -----------------------------------------------------

        if prediction is None:

            prediction = (
                "FAKE"
                if score >= 50
                else "REAL"
            )

        prediction = str(
            prediction
        ).upper()

        # -----------------------------------------------------
        # Confidence fallback
        # -----------------------------------------------------

        if confidence <= 0:

            confidence = max(
                score,
                100 - score
            )

        # -----------------------------------------------------
        # Risk
        # -----------------------------------------------------

        risk_level = self._calculate_risk(
            score
        )

        # -----------------------------------------------------
        # Evidence
        # -----------------------------------------------------

        evidence = self._generate_evidence(
            modality,
            result,
            score
        )

        # -----------------------------------------------------
        # Recommendation
        # -----------------------------------------------------

        recommendation = (
            self._generate_recommendation(
                risk_level
            )
        )

        # -----------------------------------------------------
        # Unified response
        # -----------------------------------------------------

        return {

            "analysis_id":
                self._generate_analysis_id(),

            "timestamp":
                datetime.utcnow()
                .isoformat()
                + "Z",

            "modality":
                modality,

            "prediction":
                prediction,

            "score":
                round(score, 2),

            "confidence":
                round(confidence, 2),

            "risk_level":
                risk_level,

            "evidence":
                evidence,

            "recommendation":
                recommendation,

            "raw_result":
                result
        }

    # =========================================================
    # RISK CALCULATION
    # =========================================================

    def _calculate_risk(self, score):

        if score >= 80:

            return "HIGH"

        elif score >= 50:

            return "MEDIUM"

        else:

            return "LOW"

    # =========================================================
    # EVIDENCE GENERATION
    # =========================================================

    def _generate_evidence(
        self,
        modality,
        result,
        score
    ):

        evidence = []

        # -----------------------------------------------------
        # Overall detector signal
        # -----------------------------------------------------

        if score >= 80:

            evidence.append({

                "type":
                    "high_risk_signal",

                "message":
                    "The detector identified a "
                    "strong synthetic-content signal.",

                "score":
                    round(score, 2)
            })

        elif score >= 50:

            evidence.append({

                "type":
                    "moderate_risk_signal",

                "message":
                    "The detector identified "
                    "suspicious synthetic-content signals.",

                "score":
                    round(score, 2)
            })

        else:

            evidence.append({

                "type":
                    "low_risk_signal",

                "message":
                    "The detector found relatively "
                    "weak synthetic-content signals.",

                "score":
                    round(score, 2)
            })

        # -----------------------------------------------------
        # VIDEO EVIDENCE
        # -----------------------------------------------------

        if modality == "video":

            suspicious_clips = result.get(
                "suspicious_clips",
                []
            )

            for clip in suspicious_clips:

                fake_probability = (
                    clip.get(
                        "fake_probability",
                        0
                    )
                )

                # Convert 0-1 → percentage

                clip_score = (
                    fake_probability * 100
                )

                evidence.append({

                    "type":
                        "suspicious_video_segment",

                    "timestamp":
                        clip.get(
                            "timestamp"
                        ),

                    "score":
                        round(
                            clip_score,
                            2
                        ),

                    "message":
                        "This video segment received "
                        "a high synthetic-content score."
                })

        # -----------------------------------------------------
        # TEXT EVIDENCE
        # -----------------------------------------------------

        elif modality == "text":

            predictions = result.get(
                "predictions",
                {}
            )

            evidence.append({

                "type":
                    "text_model_signal",

                "message":
                    "The language detector evaluated "
                    "the submitted text for "
                    "AI-generated writing signals.",

                "predictions":
                    predictions
            })

        # -----------------------------------------------------
        # IMAGE EVIDENCE
        # -----------------------------------------------------

        elif modality == "image":

            evidence.append({

                "type":
                    "image_model_signal",

                "message":
                    "The image detector evaluated "
                    "the submitted image for "
                    "synthetic-content signals."
            })

        # -----------------------------------------------------
        # AUDIO EVIDENCE
        # -----------------------------------------------------

        elif modality == "audio":

            evidence.append({

                "type":
                    "audio_model_signal",

                "message":
                    "The audio detector evaluated "
                    "the submitted audio for "
                    "synthetic or manipulated signals."
            })

        return evidence

    # =========================================================
    # RECOMMENDATION
    # =========================================================

    def _generate_recommendation(
        self,
        risk_level
    ):

        if risk_level == "HIGH":

            return (
                "Human verification strongly recommended."
            )

        elif risk_level == "MEDIUM":

            return (
                "Additional human verification recommended."
            )

        else:

            return (
                "No strong synthetic-content signal detected."
            )

    # =========================================================
    # SAFE FLOAT
    # =========================================================

    def _safe_float(self, value):

        try:

            return float(value)

        except (
            TypeError,
            ValueError
        ):

            return 0.0

    # =========================================================
    # ANALYSIS ID
    # =========================================================

    def _generate_analysis_id(self):

        return datetime.utcnow().strftime(
            "%Y%m%d%H%M%S%f"
        )