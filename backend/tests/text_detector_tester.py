from app_detectors.text_detector import TextDetector

detector = TextDetector()


text = "Artificial intelligence has revolutionized numerous aspects of modern society, offering unprecedented opportunities for innovation, efficiency, and growth. From healthcare and education to finance and transportation, AI-powered technologies are transforming traditional processes and enabling organizations to make more informed decisions. However, the rapid advancement of artificial intelligence also presents significant challenges, including ethical concerns, data privacy issues, algorithmic bias, and the potential misuse of generative AI. Therefore, it is essential for individuals, organizations, and governments to adopt responsible approaches that promote transparency, accountability, and the ethical development of AI technologies. By striking a balance between technological progress and responsible implementation, society can maximize the benefits of artificial intelligence while minimizing its potential risks."

result = detector.analyze(text)

print("=====================TEXT DETECTION RESULTS========================")

print(f"Modality: {result['modality']}")
print(f"Suspicion Score: {result['score']}%")
print(f"Confidence: {result['confidence']}%")

print("\nRaw predictions:")

for label, probability in result["predictions"].items():

    print(
        f"{label}: {probability:.4f}"
    )