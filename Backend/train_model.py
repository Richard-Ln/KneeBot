from KneeBot import KneeBotDataBuilder, KneeBotModelTrainer

def run_training_pipeline():
    print("Initializing Data Builder...")
    builder = KneeBotDataBuilder('Final Results - OA Study.csv')

    print("Cleaning data, building targets, and exporting transformer...")
    X_train, X_test, y_train, y_test, target_names = builder.prepare_and_export_data()

    print("Initializing Model Trainer...")
    trainer = KneeBotModelTrainer()

    trainer.train(X_train, y_train, target_names)

    print("Evaluating Model Performance...")
    trainer.evaluate(X_test, y_test)

    print("Exporting Production Assets...")
    trainer.export_production_assets()

    print("Pipeline Complete. .joblib files are ready for the API.")

if __name__ == "__main__":
    run_training_pipeline()