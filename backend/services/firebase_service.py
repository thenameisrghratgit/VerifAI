import os

import firebase_admin

from firebase_admin import (
    credentials,
    firestore
)


class FirebaseService:

    def __init__(self):

        print(
            "\nInitializing Firebase..."
        )

        # -------------------------------------------------
        # Service account path
        # -------------------------------------------------

        backend_dir = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                ".."
            )
        )

        credentials_path = os.path.join(
            backend_dir,
            "firebase-service-account.json"
        )

        if not os.path.exists(
            credentials_path
        ):

            raise FileNotFoundError(
                "Firebase service account file "
                "not found:\n"
                f"{credentials_path}"
            )

        # -------------------------------------------------
        # Initialize Firebase only once
        # -------------------------------------------------

        if not firebase_admin._apps:

            cred = credentials.Certificate(
                credentials_path
            )

            firebase_admin.initialize_app(
                cred
            )

        # -------------------------------------------------
        # Firestore client
        # -------------------------------------------------

        self.db = firestore.client()

        self.collection = (
            self.db.collection(
                "analyses"
            )
        )

        print(
            "Firebase Firestore connected!"
        )

    # =====================================================
    # SAVE ANALYSIS
    # =====================================================

    def save_analysis(
        self,
        result
    ):

        if not result:

            raise ValueError(
                "Cannot save empty analysis."
            )

        analysis_id = result.get(
            "analysis_id"
        )

        if not analysis_id:

            raise ValueError(
                "Analysis result does not contain "
                "an analysis_id."
            )

        document = (
            self.collection
            .document(analysis_id)
        )

        document.set(
            result
        )

        print(
            f"Analysis saved to Firestore: "
            f"{analysis_id}"
        )

        return analysis_id

    # =====================================================
    # GET ANALYSIS
    # =====================================================

    def get_analysis(
        self,
        analysis_id
    ):

        document = (
            self.collection
            .document(analysis_id)
            .get()
        )

        if not document.exists:

            return None

        return document.to_dict()

    # =====================================================
    # GET RECENT HISTORY
    # =====================================================

    def get_history(
        self,
        limit=20
    ):

        documents = (
            self.collection
            .order_by(
                "timestamp",
                direction=firestore.Query.DESCENDING # type: ignore
            )
            .limit(limit)
            .stream()
        )

        results = []

        for document in documents:

            data = document.to_dict()

            results.append(
                data
            )

        return results