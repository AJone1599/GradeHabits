from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import joblib
from vellum.client import Vellum
import vellum.types as types
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

#Load the pre-trained model
model = joblib.load('MachineLearning\gradePredictionModel.pkl')

# --- Vellum Configuration ---
client = Vellum(
  api_key=os.environ["VELLUM_API_KEY"]
)

app = Flask(__name__)
CORS(app)
@app.route('/api/predict', methods=['POST'])
def predict():
    #Get user answers from survey
    data = request.get_json()
    print('Received POST request JSON:', data)
    try:
        input_df = pd.DataFrame([data])
        prediction = model.predict(input_df)[0]

        ai_response = "Could not generate advice." # Default message
        vellum_response = client.execute_workflow(
            workflow_deployment_name="grade-habits",
            release_tag="LATEST",
            inputs=[
                types.WorkflowRequestNumberInputRequest(
                    name="age",
                    type="NUMBER",
                    value=float(data.get("age", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="study_time_week",
                    type="NUMBER",
                    value=float(data.get("study_time_week", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="daytime_evening_classes",
                    type="NUMBER",
                    value=float(data.get("daytime_evening_classes", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="attendance",
                    type="NUMBER",
                    value=float(data.get("attendance", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="previous_qualifications",
                    type="NUMBER",
                    value=float(data.get("previous_qualifications", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="displaced",
                    type="NUMBER",
                    value=float(data.get("displaced", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="entertainment_hours",
                    type="NUMBER",
                    value=float(data.get("entertainment_hours", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="work",
                    type="NUMBER",
                    value=float(data.get("work", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="average_sleep",
                    type="NUMBER",
                    value=float(data.get("average_sleep", 0)),
                ),
                types.WorkflowRequestNumberInputRequest(
                    name="mental_health",
                    type="NUMBER",
                    value=float(data.get("mental_health", 0)),
                ),
            ],
        )
        # Extract the main text or result from the vellum_response object
        ai_response = None
        # Try to extract the value from the workflow output
        if hasattr(vellum_response, 'data') and hasattr(vellum_response.data, 'outputs'):
            outputs = vellum_response.data.outputs
            if outputs and hasattr(outputs[0], 'value'):
                ai_response = outputs[0].value
            else:
                ai_response = str(vellum_response)
        else:
            ai_response = str(vellum_response)

        return jsonify({
            'prediction': prediction,
            "responseFromAI": ai_response
            })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'status': 'error', 'message': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
