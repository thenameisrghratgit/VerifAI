import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification


class TextDetector: 
    MODEL_NAME = "ogmatrixllm/glyph-v1.1"

    def __init__(self):
        print("Loading Text Detection Model...")
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        print("Using Device:", self.device)

        if self.device.type == "cuda":
            print("GPU:", torch.cuda.get_device_name(0))

        self.tokenizer = AutoTokenizer.from_pretrained(
            self.MODEL_NAME
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            self.MODEL_NAME
        )
        print("Label Mapping:", self.model.config.id2label)
        self.model.to(self.device)
        self.model.eval()

        print("Text Model Loaded Successfully!")

    def analyze(self, text):
        if not text or not text.strip():
            raise ValueError(
                "Text Cannot be Empty."
            )

        inputs = self.tokenizer(
            text, return_tensors ="pt",
            truncation = True,
            max_length = 512
        )

        inputs = {
            key: value.to(self.device)
            for key, value in inputs.items()
        }

        with torch.no_grad():
            outputs = self.model(**inputs)

        probabilities = torch.softmax(
            outputs.logits,
            dim = -1
        )[0]

        results: dict[str, float] = {}

        for index, probability in enumerate(probabilities):
            label = self.model.config.id2label[index]

            results[label] = float(probability)

        ai_probability = results["LABEL_1"]
        human_probability = results["LABEL_0"]

        prediction = (
            "AI-generated"
            if ai_probability >= 0.5
            else "Human-written"
        )   

        prediction = max(
            results,
            key=results.get # type: ignore
        ) # type: ignore

        return {
    "modality": "text",
    "prediction": prediction,
    "score": round(ai_probability * 100, 2),
    "confidence": round(
        max(ai_probability, human_probability) * 100,
        2
        ),
    "predictions": {
        "Human": round(human_probability, 4),
        "AI-generated": round(ai_probability, 4)
        }
    }