from services.firebase_service import FirebaseService


firebase = FirebaseService()


test_result = {

    "analysis_id":
        "test_verifai_001",

    "timestamp":
        "2026-08-26T12:00:00Z",

    "modality":
        "text",

    "prediction":
        "REAL",

    "score":
        12.4,

    "confidence":
        87.6,

    "risk_level":
        "LOW",

    "recommendation":
        "No strong synthetic-content signal detected.",

    "evidence": [

        {
            "type":
                "low_risk_signal",

            "message":
                "Test Firestore entry."
        }

    ]
}


firebase.save_analysis(
    test_result
)


print(
    "\nFirebase test successful!"
)