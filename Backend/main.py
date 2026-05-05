from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd

# Import existing classes from the backend script
from KneeBot import Patient, KneeBotInferenceEngine

# Initialize the FastAPI application
app = FastAPI(
    title="KneeBot API",
    description="Backend API layer for the KneeBot recommendation system."
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "KneeBot API is running. Navigate to /docs to test."}

# Instantiate the inference engine via composition at startup.
# This ensures the .joblib assets are loaded into memory once and reused across requests.
engine = KneeBotInferenceEngine(
    transformer_path='kneebot_transformer.joblib',
    model_path='kneebot_rf_model.joblib',
    targets_path='kneebot_target_names.joblib'
)

class PatientPayload(BaseModel):
    """
    Pydantic model defining the strict 15-feature JSON payload expected from the React frontend.
    """
    Age: float
    Height: float
    Weight: float
    Gender: str
    Education: str
    Employment: str
    Income: str
    Ethnicity: str
    Race: str
    MedBackgrnd: str
    Industry: str
    Department: str
    Stand: float
    Profession: str
    Insurance: str

@app.post("/api/predict")
def get_treatment_plan(payload: PatientPayload):
    """
    Receives raw patient data, validates it through the Patient DTO,
    and generates personalized treatment recommendations.
    """
    try:
        # Convert the Pydantic model to a dictionary
        raw_data = payload.model_dump()

        # 1. Instantiate the Patient DTO (triggers automatic validation)
        patient = Patient(raw_data=raw_data)

        # 2. Extract single-row DataFrame
        df_raw = patient.to_dataframe()

        # 3. Transform features using the engine's loaded transformer
        X_transformed = engine.transformer.transform(df_raw)

        # 4. Generate raw probabilities from the trained Random Forest
        y_proba_list = engine.model.predict_proba(X_transformed)

        # 5. Extract positive class probabilities
        extracted_probs = [
            prob[0][1] if prob.shape[1] > 1 else 0.0
            for prob in y_proba_list
        ]

        # 6. Map probabilities to target names and apply business logic
        patient_probs = pd.Series(extracted_probs, index=engine.target_names)
        final_recs = engine._apply_business_logic(patient_probs)

        # 7. Format the output for the JSON response
        formatted_recs = {}
        for treatment, prob in final_recs.items():
            clean_name = (treatment
                          .replace('Target_OTC_', 'OTC: ')
                          .replace('Target_Exercise_', 'Exercise: ')
                          .replace('_', ' '))
            formatted_recs[clean_name] = round(float(prob), 4)

        return {
            "status": "success",
            "recommendations": formatted_recs
        }

    except ValueError as e:
        # Catch validation errors from the Patient DTO and return a 400 Bad Request
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catch unexpected server errors
        raise HTTPException(status_code=500, detail=f"Inference processing error: {str(e)}")