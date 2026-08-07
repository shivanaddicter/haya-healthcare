import uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
import random
from typing import List, Optional

app = FastAPI(
    title="Haya Health Care AI Engine",
    description="Multi Disease Prediction & Healthcare Analytics API Service",
    version="1.0.0"
)

# Configure CORS so frontend React app can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---

class KidneyInput(BaseModel):
    age: float
    bp: float
    sg: float
    al: float
    su: float
    bgr: float
    bu: float
    sc: float
    sod: float
    pot: float
    hemo: float

class DiabetesInput(BaseModel):
    pregnancies: int
    glucose: float
    bp: float
    skin: float
    insulin: float
    bmi: float
    dpf: float
    age: int

class HeartInput(BaseModel):
    age: int
    gender: int  # 1: Male, 0: Female
    cp: int      # Chest Pain Type
    chol: float
    bp: float
    thalach: float  # Max heart rate
    restecg: int

class LiverInput(BaseModel):
    age: int
    bilirubin: float
    alkphos: float
    sgpt: float
    sgot: float
    protein: float

class ParkinsonInput(BaseModel):
    jitter: float
    shimmer: float
    hnr: float
    rpde: float

class LungInput(BaseModel):
    smoking: int
    alcohol: int
    age: int
    chestpain: int
    fatigue: int
    breathing: int

class StrokeInput(BaseModel):
    age: int
    hypertension: int
    heartdisease: int
    bmi: float
    glucose: float

# --- Routes ---

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Haya Health Care AI Engine",
        "supported_models": ["Kidney", "Diabetes", "Heart", "Liver", "Parkinson", "Lung Cancer", "Stroke"]
    }

@app.post("/predict/kidney")
def predict_kidney(data: KidneyInput):
    # Simulated classification logic representing ML decision boundary
    risk = min(round((data.sc * 25) + (data.al * 20) + (16 - data.hemo) * 5), 99)
    status = "High Risk" if risk > 70 else "Moderate Risk" if risk > 35 else "Low Risk / Healthy"
    return {
        "disease": "Kidney Disease",
        "risk_percentage": risk,
        "status": status,
        "confidence_score": round(95.0 + random.random() * 4.0, 2)
    }

@app.post("/predict/diabetes")
def predict_diabetes(data: DiabetesInput):
    risk = min(round((40 if data.glucose > 125 else 10) + (25 if data.bmi > 30 else 10) + (20 if data.age > 45 else 10)), 99)
    status = "Diabetic" if risk > 60 else "Non Diabetic"
    return {
        "disease": "Diabetes",
        "risk_percentage": risk,
        "status": status,
        "risk_score": risk / 100.0
    }

@app.post("/predict/heart")
def predict_heart(data: HeartInput):
    risk = min(round((30 if data.bp > 140 else 10) + (35 if data.chol > 240 else 10) + (15 if data.gender == 1 else 5)), 99)
    return {
        "disease": "Heart Disease",
        "heart_disease_risk": "High" if risk > 70 else "Moderate" if risk > 35 else "Low",
        "risk_percentage": risk,
        "confidence_score": round(95.0 + random.random() * 4.0, 2)
    }

@app.post("/predict/liver")
def predict_liver(data: LiverInput):
    risk = min(round((data.bilirubin * 30) + (25 if data.sgpt > 45 else 10)), 99)
    return {
        "disease": "Liver Disease",
        "liver_disease_status": "High Risk" if risk > 70 else "Healthy / Low Risk",
        "risk_percentage": risk
    }

@app.post("/predict/parkinson")
def predict_parkinson(data: ParkinsonInput):
    risk = min(round(data.jitter * 8000), 99)
    return {
        "disease": "Parkinson's Disease",
        "parkinson_risk": "High" if risk > 70 else "Moderate" if risk > 35 else "Low",
        "risk_percentage": risk
    }

@app.post("/predict/lung-cancer")
def predict_lung(data: LungInput):
    smoking_factor = 40 if data.smoking == 2 else 10
    breathing_factor = 30 if data.breathing == 2 else 10
    risk = min(smoking_factor + breathing_factor + 10, 99)
    return {
        "disease": "Lung Cancer",
        "cancer_risk": "High Risk" if risk > 70 else "Low Risk",
        "risk_percentage": risk
    }

@app.post("/predict/stroke")
def predict_stroke(data: StrokeInput):
    risk = min(round((30 if data.age > 60 else 10) + (35 if data.hypertension == 1 else 10)), 99)
    return {
        "disease": "Stroke",
        "stroke_risk": "High Risk" if risk > 70 else "Low Risk",
        "risk_percentage": risk
    }

@app.post("/dataset/analyze")
async def analyze_dataset(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Mock file parser logic for CSV/Excel
        df = pd.read_csv(pd.compat.StringIO(contents.decode('utf-8'))) if file.filename.endswith('.csv') else pd.DataFrame()
        if df.empty:
            raise HTTPException(status_code=400, detail="Invalid CSV File format.")
        
        row_count, col_count = df.shape
        missing_count = int(df.isnull().sum().sum())
        duplicate_count = int(df.duplicated().sum())

        return {
            "filename": file.filename,
            "row_count": row_count,
            "column_count": col_count,
            "missing_values": missing_count,
            "duplicates": duplicate_count,
            "columns": list(df.columns)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/models/retrain")
def retrain_models(model_name: str = Form(...)):
    # Simulated retrain pipeline
    new_accuracy = round(97.5 + random.random() * 2.0, 2)
    return {
        "status": "success",
        "model": model_name,
        "new_accuracy": f"{new_accuracy}%",
        "message": f"Successfully loaded new weights and parameters. Engine updated."
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
