# KneeBot

### A Multi-Label Machine Learning Recommendation System for Joint Pain Management

KneeBot is an end-to-end intelligent application designed to provide personalized, educational joint pain management recommendations. By analyzing a user's demographics, occupational habits, and physical metrics, the system generates a tailored treatment plan encompassing optimal over-the-counter (OTC) medications and targeted exercises. 

This repository contains the full stack: the offline machine learning data pipeline, the Python inference server, and the React user interface.

---

## Key Features

* **Personalized Treatment Plans:** Utilizes a multi-label classification engine to recommend specific OTC products and physical exercises tailored to individual profiles.
* **Robust ML Pipeline:** Features a custom Scikit-Learn BaseEstimator/Transformer to guarantee production-grade data integrity, stateless imputation, and reproducible preprocessing for continuous and Multi-Choice Multi-Answer (MCMA) variables.
* **High-Performance API:** A FastAPI-driven RESTful backend serving strictly validated predictions with low latency.
* **Modern Single Page Application (SPA):** A highly responsive, accessible, and interactive frontend built with React, Vite, and TailwindCSS.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router, TailwindCSS |
| **Backend** | FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | Scikit-Learn, Pandas, NumPy, Joblib |

---

## Architecture Overview

KneeBot strictly separates the presentation layer, the API gateway, and the machine learning logic to ensure scalability and maintainability.

1.  **Frontend (React/Vite):** Captures user input via a multi-step interactive quiz. The React application manages local state and submits a strictly formatted JSON payload to the backend API.
2.  **Backend (FastAPI):** Acts as the API gateway. It intercepts the HTTP POST request and enforces strict data validation and type coercion using Pydantic models. Once validated, it instantiates a unified inference engine.
3.  **Inference Engine (Scikit-Learn):** The engine loads pre-trained serialized `.joblib` assets. It processes the raw JSON through a custom feature transformer (handling scaling, one-hot encoding, and string parsing) and passes the matrix to a trained **Random Forest Classifier**, which returns multi-label probabilities. Business logic then filters these probabilities to return the top 3 OTC and top 3 exercise recommendations to the client.

---

## Getting Started (Local Development)

Follow these steps to run the KneeBot ecosystem on your local machine.

### 1. Start the Backend (FastAPI Server)
Ensure you have Python 3.9+ installed. It is recommended to use an isolated environment like Conda or venv.

```bash
# Install the ASGI server and required data science libraries
conda install uvicorn
pip install fastapi pydantic pandas scikit-learn joblib

# Navigate to your backend directory (if separated) and start the server
uvicorn main:app --reload
```
*The API will be available at `http://127.0.0.1:8000`. You can view the interactive Swagger documentation at `http://127.0.0.1:8000/docs`.*

### 2. Start the Frontend (React/Vite UI)
Ensure you have Node.js 18+ installed.

```bash
# Navigate to the frontend UI directory
cd kneebot-ui

# Install core React dependencies
npm install

# Install TailwindCSS and the Vite plugin as dev dependencies
npm install -D tailwindcss @tailwindcss/vite

# Start the development server
npm run dev
```
*The frontend will be available at `http://localhost:5173`.*

---

## Model Evaluation & Selection

Developing a multi-label classification model for subjective health survey data presents unique challenges due to sparse matrices and class imbalances. To ensure the most robust predictions, we constructed an offline evaluation pipeline comparing three distinct architectures:

1.  **Random Forest (Production Model)**
2.  **Logistic Regression (Wrapped via MultiOutputClassifier)**
3.  **K-Nearest Neighbors (KNN)**

**Why Random Forest?**
While Exact Match Ratios (Strict Accuracy) were uniformly low across all models due to the high-dimensionality of the 31 possible target labels, **Random Forest** was selected as the production model. It natively handles multi-label outputs, is highly resistant to overfitting on our continuous variables, and provided the most balanced Hamming Loss matrix (minimizing the fraction of incorrect individual labels). It also allows for efficient `predict_proba` extraction to rank treatments by confidence scores.


**Developed By:** Richard Linn, Ryan Galbraith, Selia Mercedes Jimenez, Alexa Li Slaughter, Phan Binh Nhu Le, & Natalia Del Rio
