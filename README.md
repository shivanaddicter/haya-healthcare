# Haya Health Care

> **AI-Powered Multi Disease Prediction and Healthcare Analytics Platform**
> *"Predict Today, Protect Tomorrow"*

Haya Health Care is a state-of-the-art clinical analytics and multi-disease diagnostic platform. Built for modern medical institutes, the platform features a responsive glassmorphism UI dashboard, 7 disease prediction models, an AI medical assistant, dataset profiling utilities, report management, and role-based registry controls.

---

## Technical Architecture

* **Frontend**: React.js, Tailwind CSS (v4), Chart.js, Lucide Icons, HTML5 Web Speech API
* **Backend**: Python, FastAPI, Pandas, NumPy, Scikit-learn
* **AI Chatbot**: OpenAI & Gemini API scaffold

---

## Features

1. **Dashboard & Analytics**: 8 real-time stat cards, 7 analytical chart widgets, and filtered demographic summaries.
2. **Multi Disease Prediction**: High-performance classification models for **Kidney Disease**, **Diabetes**, **Heart Disease**, **Liver Disease**, **Parkinson's Disease**, **Lung Cancer**, and **Stroke**.
3. **Voice Input/Output**: Interactive voice commands to autofill forms and spoken risk assessments.
4. **AI Assistant**: A context-aware chatbot supporting symptom analysis, dietary guidelines, and emergency alerts.
5. **Dataset Upload & Analytics**: Detailed profiles showing row count, missing values, duplicates, and feature correlations.
6. **Patient Registry & ReportsCenter**: Patient CRUD tracking, history logs, consult records, and exports in PDF, CSV, and Excel formats.
7. **Control Panel**: Admin workspace allowing user registry maintenance and neural model retrains.

---

## Quick Start & Running Guide

### 1. Frontend Server (Vite + React)

From the project root directory, install npm packages and launch the hot-reloading development server:

```bash
# Install package dependencies
npm install

# Start local server
npm run dev
```

The application will be accessible at: `http://localhost:5173`

#### 💡 Demo Logins:
Use the **QUICK SIGN-IN** buttons on the login page or enter these manual credentials:
* **Admin**: `hariprasath72788@gmail.com` (or `admin@haya.com`) / password: `Hari@2007`
* **Doctor**: `doctor@haya.com` / password: `doctor`
* **Patient**: `patient@haya.com` / password: `patient`

---

### 2. Backend Server (FastAPI)

To run the Python service API, set up your Python environment and start the uvicorn worker:

```bash
# Navigate to backend folder
cd backend

# Install python libraries
pip install -r requirements.txt

# Start API service
python app/main.py
```

The FastAPI Swagger docs will be hosted at: `http://127.5.5.1:8000/docs` or `http://localhost:8000/docs`
