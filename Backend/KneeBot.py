import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, hamming_loss, classification_report

class Patient:
    """
    Data Transfer Object (DTO) for KneeBot patient data.
    Validates incoming raw dictionary data and converts it to a guaranteed
    format suitable for the ML preprocessing pipeline.
    """

    # The exact 15 feature names required by the KneeBot model, including skip-logic columns
    REQUIRED_FIELDS = [
        'Age', 'Height', 'Weight', 'Gender', 'Education', 'Employment',
        'Income', 'Ethnicity', 'Race', 'MedBackgrnd', 'Industry',
        'Department', 'Stand', 'Profession', 'Insurance'
    ]

    def __init__(self, raw_data: dict):
        """
        Initializes the Patient object and immediately triggers data validation.
        """
        self.raw_data = raw_data
        self.cleaned_data = {}
        self._validate()

    def _validate(self):
        """
        Validates that all required fields are present, properly typed, and logically sound.
        Raises a ValueError if the input is malformed.
        """
        # 1. Check for missing required keys
        missing_keys = [key for key in self.REQUIRED_FIELDS if key not in self.raw_data]
        if missing_keys:
            raise ValueError(f"Invalid patient data. Missing required fields: {missing_keys}")

        # 2. Normalize the data structure
        # The procedural script used lists (e.g., 'Age': [65]), but standard API payloads
        # often use scalars (e.g., 'Age': 65). This normalizes everything to scalar values.
        for key in self.REQUIRED_FIELDS:
            val = self.raw_data[key]
            if isinstance(val, list) and len(val) == 1:
                val = val[0]
            self.cleaned_data[key] = val

        # 3. Type checking and logical bounds for continuous numeric variables
        try:
            age = float(self.cleaned_data['Age'])
            height = float(self.cleaned_data['Height'])
            weight = float(self.cleaned_data['Weight'])

            if age <= 0 or height <= 0 or weight <= 0:
                raise ValueError("Age, Height, and Weight must be positive numbers.")

            # Explicitly store the casted numeric values
            self.cleaned_data['Age'] = age
            self.cleaned_data['Height'] = height
            self.cleaned_data['Weight'] = weight

        except (TypeError, ValueError) as e:
            raise ValueError(f"Numeric type conversion failed for Age, Height, or Weight. Details: {e}")

        # 4. Basic type checking for categorical variables
        categorical_cols = [col for col in self.REQUIRED_FIELDS if col not in ['Age', 'Height', 'Weight', 'Stand']]
        for col in categorical_cols:
            if not isinstance(self.cleaned_data[col], str):
                raise ValueError(
                    f"Field '{col}' must be a string. Received type {type(self.cleaned_data[col])} for value: {self.cleaned_data[col]}")

    def to_dataframe(self) -> pd.DataFrame:
        """
        Converts the validated patient data into a single-row Pandas DataFrame.
        """
        # Wrap scalar values back into lists to create a clean, single-row DataFrame
        df_dict = {key: [value] for key, value in self.cleaned_data.items()}
        return pd.DataFrame(df_dict)

class KneeBotFeatureTransformer(BaseEstimator, TransformerMixin):
    """
    A custom Scikit-Learn transformer that handles all feature engineering for KneeBot.
    Handles missing value imputation, scaling, one-hot encoding, and MCMA string parsing.
    """

    def __init__(self):
        # Initialize hyperparameters and sub-estimators ONLY.
        # State variables (ending with '_') are strictly reserved for the fit() method
        # to ensure full Scikit-Learn API compliance.
        self.scaler = StandardScaler()
        self.ohe = OneHotEncoder(handle_unknown='ignore', sparse_output=False)
        self.continuous_cols = ['Age', 'Height', 'Weight', 'Stand']
        self.mcma_cols = ['MedBackgrnd', 'Race', 'Industry', 'Department', 'Profession']

    def fit(self, X: pd.DataFrame, y=None):
        """
        Learns the imputation values, scaling parameters, categorical boundaries,
        and unique MCMA substrings from the training data.
        """
        # 1. Identify standard categorical columns dynamically
        self.categorical_cols_ = [
            col for col in X.columns
            if col not in self.continuous_cols and col not in self.mcma_cols
        ]

        # 2. Calculate and store continuous medians for imputation
        self.continuous_medians_ = X[self.continuous_cols].median()

        # Create a temporary dataframe for fitting to avoid altering the original X
        X_fit = X.copy()

        # Apply imputation locally so the scaler and OHE can fit on complete data
        X_fit[self.continuous_cols] = X_fit[self.continuous_cols].fillna(self.continuous_medians_)
        X_fit[self.categorical_cols_] = X_fit[self.categorical_cols_].fillna('Not Applicable')

        # 3. Fit the Scaler and OneHotEncoder on the imputed data
        self.scaler.fit(X_fit[self.continuous_cols])
        self.ohe.fit(X_fit[self.categorical_cols_])

        # 4. Learn all unique substrings in the MCMA column
        self.mcma_categories_ = {}
        mcma_feature_names = []

        for col in self.mcma_cols:
            mcma_series = X_fit[col].fillna('').astype(str)
            unique_categories = set()

            for row in mcma_series:
                parts = [part.strip() for part in row.split(',') if part.strip()]
                unique_categories.update(parts)

            sorted_cats = sorted(list(unique_categories))
            self.mcma_categories_[col] = sorted_cats

            # Dynamically build feature names like "Race_White" or "Industry_Retail"
            mcma_feature_names.extend([f"{col}_{cat}" for cat in sorted_cats])

        # 5. Calculate and store the exact final feature names
        # This guarantees transform() is stateless and we know the exact output shape ahead of time.
        ohe_feature_names = list(self.ohe.get_feature_names_out(self.categorical_cols_))

        self.final_feature_names_ = self.continuous_cols + ohe_feature_names + mcma_feature_names

        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Applies the learned imputations and transformations to the dataset,
        guaranteeing the output strictly matches the state learned during fit().
        """
        # Create a copy to avoid SettingWithCopyWarning
        X_trans = X.copy()

        # 1. Impute and Transform Continuous Columns
        X_trans[self.continuous_cols] = X_trans[self.continuous_cols].fillna(self.continuous_medians_)
        scaled_continuous = self.scaler.transform(X_trans[self.continuous_cols])

        df_continuous = pd.DataFrame(
            scaled_continuous,
            columns=self.continuous_cols,
            index=X_trans.index
        )

        # 2. Impute and Transform Standard Categorical Columns
        X_trans[self.categorical_cols_] = X_trans[self.categorical_cols_].fillna('Not Applicable')
        encoded_cats = self.ohe.transform(X_trans[self.categorical_cols_])

        df_categorical = pd.DataFrame(
            encoded_cats,
            columns=self.ohe.get_feature_names_out(self.categorical_cols_),
            index=X_trans.index
        )

        # 3. Construct MCMA Columns
        df_mcma_list = []
        for col in self.mcma_cols:
            mcma_series = X_trans[col].fillna('').astype(str)
            df_temp = pd.DataFrame(index=X_trans.index)

            for cat in self.mcma_categories_[col]:
                col_name = f"{col}_{cat}"
                df_temp[col_name] = mcma_series.apply(
                    lambda row_str: 1 if cat in [p.strip() for p in row_str.split(',')] else 0
                )
            df_mcma_list.append(df_temp)

        df_mcma = pd.concat(df_mcma_list, axis=1) if df_mcma_list else pd.DataFrame(index=X_trans.index)

        # 4. Concatenate and strictly align columns
        df_final = pd.concat([df_continuous, df_categorical, df_mcma], axis=1)

        # Reorder the dataframe to strictly match the order established in fit().
        # Because we built the columns directly from the fitted state, this is a safe reordering,
        # not a blind, potentially destructive reindex.
        return df_final[self.final_feature_names_]

class KneeBotDataBuilder:
    """
    Orchestrates the data pipeline for KneeBot. Loads raw survey data, cleans it,
    builds the multi-label targets, and splits the data. It also fits and exports
    the feature transformer to ensure production alignment.
    """

    def __init__(self, file_path: str):
        self.file_path = file_path
        self.df = None

    def _clean_data(self):
        """
        Loads the raw CSV, drops Qualtrics metadata, forces numeric conversions,
        and strips out data leakage and survey artifacts.
        """
        # 1. Load the CSV
        self.df = pd.read_csv(self.file_path)

        # Fix trailing space in the 'Stand' column
        self.df.rename(columns={'Stand ': 'Stand'}, inplace=True)

        # Drop the first row (Qualtrics question descriptions) to prevent data type errors
        self.df = self.df.iloc[1:].reset_index(drop=True)

        # Clean column names by stripping trailing spaces
        self.df.columns = self.df.columns.str.strip()

        # 2. Drop 18 Qualtrics metadata columns
        metadata_cols = [
            'StartDate', 'EndDate', 'Status', 'IPAddress', 'Progress',
            'Duration (in seconds)', 'Finished', 'RecordedDate', 'ResponseId',
            'RecipientLastName', 'RecipientFirstName', 'RecipientEmail',
            'ExternalReference', 'LocationLatitude', 'LocationLongitude',
            'DistributionChannel', 'UserLanguage', 'Q_RecaptchaScore'
        ]
        self.df.drop(columns=metadata_cols, errors='ignore', inplace=True)

        # 3. Force continuous columns to numeric, converting dirty strings to NaN
        continuous_cols = ['Age', 'Height', 'Weight', 'Stand']
        for col in continuous_cols:
            if col in self.df.columns:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')

        # 4. Drop unstructured text columns
        text_cols = [col for col in self.df.columns if str(col).endswith('_TEXT')]
        self.df.drop(columns=text_cols, inplace=True)

        # 5. Drop data leakage and survey artifacts
        leakage_keywords = ['otc', 'exercise', 'exerci', 'exer', 'stretch', 'strength', 'exchange']
        survey_artifacts = [' ', 'Exclusions', 'Identify you liked?', 'Episodes', 'Duration _4', 'Duration _5',
                            'Attention', 'aid', 'gc']

        # We MUST protect our target source columns from the leakage drop so they
        # survive to reach the _build_targets() method.
        raw_target_cols = ['OTC used', 'Exercise types pract']

        cols_to_drop = []
        for col in self.df.columns:
            col_str = str(col)
            col_lower = col_str.lower()

            if not col_str.startswith('Target_') and col_str not in raw_target_cols:
                is_leakage = any(keyword in col_lower for keyword in leakage_keywords)
                is_artifact = col_str in survey_artifacts

                if is_leakage or is_artifact:
                    cols_to_drop.append(col)

        self.df.drop(columns=cols_to_drop, errors='ignore', inplace=True)

        # Explicitly whitelist ONLY the required features and the raw target columns.
        # This prevents any hidden Qualtrics garbage from entering the training pipeline.
        allowed_cols = Patient.REQUIRED_FIELDS + ['OTC used', 'Exercise types pract']

        # Filter the dataframe to keep only the allowed columns
        self.df = self.df[[col for col in allowed_cols if col in self.df.columns]]

    def _build_targets(self):
        """
        Extracts and binarizes the OTC and Exercise multi-label columns.
        Consolidates rare exercise classes into 'Target_Exercise_Others'.
        """
        # --- 1. OTC Targets ---
        otc_col = 'OTC used'
        if otc_col in self.df.columns:
            self.df[otc_col] = self.df[otc_col].fillna('')

            otc_specific_targets = [
                "Acetaminophen (Tylenol)", "Ibuprofen", "Ice pack", "Heating pad",
                "Voltaren Gel", "Naproxen", "Icy Hot", "Biofreeze", "Aspercreme",
                "Acetaminophen & aspirin combination", "Salonpas", "Orthosis",
                "Glucosamine", "Turmeric", "Aspirin (Bayer)", "Bengay",
                "Fish oil", "Capsaicin", "Tiger balm", "Chondroitin",
                "MSM", "Electric stimulator"
            ]

            for cat in otc_specific_targets:
                # Sanitize the target string to create clean, standard column names
                # e.g., "Acetaminophen (Tylenol)" -> "Target_OTC_Acetaminophen_Tylenol"
                clean_name = (cat.replace(" ", "_")
                              .replace("(", "")
                              .replace(")", "")
                              .replace("&", "and")
                              .replace(",", ""))

                col_name = f'Target_OTC_{clean_name}'

                # regex=False ensures special characters in strings like "(Tylenol)" are treated as literal text
                self.df[col_name] = self.df[otc_col].str.contains(cat, case=False, regex=False).astype(int)

            # Drop the original raw column
            self.df.drop(columns=[otc_col], inplace=True)

        # --- 2. Exercise Targets ---
        exer_col = 'Exercise types pract'
        if exer_col in self.df.columns:
            self.df[exer_col] = self.df[exer_col].fillna('').str.replace(', ', ',')
            exer_targets = self.df[exer_col].str.get_dummies(sep=',')
            exer_targets = exer_targets.add_prefix('Target_Exercise_')

            # Rename specific lengthy columns based on original survey logic
            exer_targets.columns = exer_targets.columns.str.replace(
                'Target_Exercise_Stretch exercises. Select this answer if you practiced any exercise similar to (but not limited to) the examples below:',
                'Target_Exercise_Stretch_exercises', regex=False)
            exer_targets.columns = exer_targets.columns.str.replace(
                'Target_Exercise_Strength exercises. Select this answer if you practiced any exercise similar to (but not limited to) the examples below:',
                'Target_Exercise_Strength_exercises', regex=False)

            # Drop the junk selected choice column
            junk_col = 'Target_Exercise_Please select below all types of the exercises that you practiced for your knee joint pain during the past 2 years. You can select more than one. - Selected Choice'
            exer_targets.drop(columns=[junk_col], errors='ignore', inplace=True)

            # Rename the 'Others' column
            other_col = 'Target_Exercise_The exercises I practiced are not listed above. Please specify:'
            exer_targets.rename(columns={other_col: 'Target_Exercise_Others'}, inplace=True)

            # Ensure 'Target_Exercise_Others' exists for rare class consolidation
            if 'Target_Exercise_Others' not in exer_targets.columns:
                exer_targets['Target_Exercise_Others'] = 0

            # --- Rare Class Consolidation ---
            rare_exercises = []
            for col in exer_targets.columns:
                if col != 'Target_Exercise_Others' and exer_targets[col].sum() < 50:
                    rare_exercises.append(col)

            # Merge rare classes into 'Others'. If any rare col or Others is 1, it becomes 1.
            cols_to_merge = rare_exercises + ['Target_Exercise_Others']
            exer_targets['Target_Exercise_Others'] = exer_targets[cols_to_merge].max(axis=1)

            # Drop the individual rare columns
            exer_targets.drop(columns=rare_exercises, inplace=True)

            # Concatenate targets to main dataframe and drop original raw column
            self.df = pd.concat([self.df, exer_targets], axis=1)
            self.df.drop(columns=[exer_col], inplace=True)

    def prepare_and_export_data(self) -> tuple:
        """
        Executes the cleaning and target building, splits the data, fits the
        transformer, and exports the serialized transformer for production.
        """
        # 1. Execute cleaning and target building
        self._clean_data()
        self._build_targets()

        # 2. Separate X (features) and y (targets)
        y_cols = [col for col in self.df.columns if col.startswith('Target_')]
        y = self.df[y_cols]
        X = self.df.drop(columns=y_cols)

        # 3. Perform Train-Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # 4. Instantiate, fit, and transform the features
        transformer = KneeBotFeatureTransformer()
        transformer.fit(X_train)

        X_train_transformed = transformer.transform(X_train)
        X_test_transformed = transformer.transform(X_test)

        # 5. Save the fitted transformer asset for the Inference Engine
        joblib.dump(transformer, 'kneebot_transformer.joblib')

        # 6. Return data and column names to pass to the Model Trainer
        return (
            X_train_transformed,
            X_test_transformed,
            y_train,
            y_test,
            y_cols
        )

class KneeBotModelTrainer:
    """
    Manages the lifecycle of the KneeBot Random Forest model.
    Handles training, performance evaluation, and exporting the final production assets.
    """

    def __init__(self):
        """
        Initializes the Random Forest multi-label classifier with optimal hyperparameters.
        Sets up a state variable to hold the dynamic target column names.
        """
        # n_estimators=100: Build 100 decision trees for robust voting.
        # random_state=42: Ensures reproducible training results.
        # n_jobs=-1: Utilizes all available CPU cores to accelerate training.
        self.model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)

        # State variable to store the exact names of the target columns learned from the builder
        self.target_names_ = None

    def train(self, X_train_transformed, y_train, target_names: list):
        """
        Fits the Random Forest model to the fully preprocessed training data.

        Args:
            X_train_transformed: The preprocessed feature matrix (DataFrame or Numpy array).
            y_train: The multi-label target matrix (DataFrame).
            target_names: A list of the target column names from the data builder.
        """
        # Store the target names as a class attribute so they can be used in evaluation and exported
        self.target_names_ = target_names

        print("Training the Multi-Label Random Forest model...")
        self.model.fit(X_train_transformed, y_train)
        print("Model training complete.\n")

        return self

    def evaluate(self, X_test_transformed, y_test):
        """
        Generates predictions on the unseen test set and calculates key multi-label metrics.

        Args:
            X_test_transformed: The preprocessed test feature matrix.
            y_test: The true targets for the test set.
        """
        if self.target_names_ is None:
            raise ValueError("The model must be trained before evaluation. Call train() first.")

        # Generate predictions
        y_pred = self.model.predict(X_test_transformed)

        # 1. Exact Match Ratio (Strict Accuracy)
        # Calculates the percentage of patients where EVERY single label was predicted perfectly.
        exact_match = accuracy_score(y_test, y_pred)
        print(f"Exact Match Ratio (Strict Accuracy): {exact_match:.4f}")

        # 2. Hamming Loss
        # Calculates the fraction of individual labels (across the entire matrix) that are incorrect.
        h_loss = hamming_loss(y_test, y_pred)
        print(f"Hamming Loss: {h_loss:.4f} (meaning {h_loss * 100:.2f}% of single predictions were wrong)")

        # 3. Classification Report
        # Provides Precision, Recall, and F1-Score for each of the specific OTC and Exercise classes.
        print("\n--- Classification Report ---")
        # zero_division=0 prevents warnings if a rare class receives 0 correct predictions
        print(classification_report(
            y_test,
            y_pred,
            target_names=self.target_names_,
            zero_division=0
        ))

    def export_production_assets(self):
        """
        Serializes and saves the trained model and the dynamic target names to disk.
        These assets will be loaded by the Inference Engine in production.
        """
        if self.target_names_ is None:
            raise ValueError("No model or target names found. You must train the model before exporting.")

        # Save the fully trained Random Forest model
        model_filename = 'kneebot_rf_model.joblib'
        joblib.dump(self.model, model_filename)
        print(f"Saved Random Forest Model to '{model_filename}'")

        # Save the list of target names so the Inference Engine doesn't have to hardcode them
        targets_filename = 'kneebot_target_names.joblib'
        joblib.dump(self.target_names_, targets_filename)
        print(f"Saved Target Names to '{targets_filename}'")

class KneeBotInferenceEngine:
    """
    The production backend service for KneeBot.
    Loads serialized training assets, processes incoming Patient objects,
    applies business logic constraints, and generates the final user-facing recommendations.
    """

    def __init__(self, transformer_path='kneebot_transformer.joblib',
                 model_path='kneebot_rf_model.joblib',
                 targets_path='kneebot_target_names.joblib'):
        """
        Loads the fitted transformer, trained model, and dynamic target names into memory.
        """
        self.transformer = joblib.load(transformer_path)
        self.model = joblib.load(model_path)
        self.target_names = joblib.load(targets_path)

    def _apply_business_logic(self, probabilities: pd.Series) -> pd.Series:
        """
        Returns the top 3 OTC and top 3 Exercise recommendations
        """
        # Separate the probabilities into OTCs and Exercises
        otc_probs = probabilities[probabilities.index.str.contains('Target_OTC_')]
        exer_probs = probabilities[probabilities.index.str.contains('Target_Exercise_')]

        top_3_otc = otc_probs.sort_values(ascending=False).head(3)
        top_3_exer = exer_probs.sort_values(ascending=False).head(3)
        
        return pd.concat([top_3_otc, top_3_exer])

    def generate_treatment_plan(self, patient) -> None:
        """
        Orchestrates the full inference pipeline for a single Patient object and
        outputs the formatted recommendations to the console.
        """
        # 1. Convert validated Patient DTO to a single-row DataFrame
        df_raw = patient.to_dataframe()

        # 2. Transform features using the loaded single-source-of-truth transformer
        X_transformed = self.transformer.transform(df_raw)

        # 3. Generate raw probabilities from the trained Random Forest
        y_proba_list = self.model.predict_proba(X_transformed)

        # 4. Extract class '1' probabilities safely
        # y_proba_list is a list of arrays (one array per target class).
        # We grab the probability of the positive class ([0][1]) for our single patient.
        # The inline if/else handles edge cases where a class was extremely rare in training.
        extracted_probs = [
            prob[0][1] if prob.shape[1] > 1 else 0.0
            for prob in y_proba_list
        ]

        # 5. Map extracted probabilities to the loaded target names
        patient_probs = pd.Series(extracted_probs, index=self.target_names)

        # 6. Apply the business logic
        final_recs = self._apply_business_logic(patient_probs)

        # 7. Output the final result
        print("========================================")
        print("KNEEBOT PERSONALIZED TREATMENT PLAN")
        print("========================================")

        for treatment, prob in final_recs.items():
            # Clean up the raw column names for the user interface
            clean_name = (treatment
                          .replace('Target_OTC_', 'OTC: ')
                          .replace('Target_Exercise_', 'Exercise: ')
                          .replace('_', ' '))

            print(f"{clean_name}: {prob * 100:.1f}% Match")

        print("========================================")