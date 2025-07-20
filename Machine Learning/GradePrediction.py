from lightgbm import LGBMRegressor
import shap
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

train_path = 'complete_full_dataset.csv'

def load_data():
    train_data = pd.read_csv(train_path)
    return train_data
train_data = load_data()
X = train_data.drop(columns=['gpa'])
y = train_data['gpa']

train_X, val_X, train_y, val_y = train_test_split(X, y, test_size=0.2, random_state=42)
model = LGBMRegressor()
model.fit(train_X, train_y)
predictions = model.predict(val_X)
val_mae = mean_absolute_error(predictions, val_y)
print(f"Validation MAE: {val_mae:.4f}")

explainer = shap.Explainer(model, train_X)
shap_values = explainer(val_X)
# Save model using a Windows-compatible path
joblib.dump(model, 'Machine Learning/gradePredictionModel.pkl')