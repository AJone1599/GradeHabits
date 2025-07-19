from dotenv import load_dotenv
load_dotenv()
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from auth import requires_auth
import joblib
# from vellum import Vellum

#Load the pre-trained model
#model = joblib.load('/Machine Learning/gradePredictionModel.pkl')

app = Flask(__name__)
CORS(app)
@app.route('/api/predict', methods=['POST'])
@requires_auth
def predict():
    data = request.get_json()
    user_answers = data.get('answers', [])
    print("User answers:", user_answers)

    # prediction = model.predict([user_answers])
    prediction = 0  # Placeholder logic

    # Temporary fake AI response (skip Vellum)
    ai_response = "This is a test response without Vellum."

    return jsonify({
        'prediction': prediction,
        'responseFromAI': ai_response
    })

# def predict():
#     #Get user answers from survey
#     data = request.get_json()
#     user_answers = data.get('answers', [])
#     print(user_answers)

#     #Change answers to a format suitable for the model
#     #prediction = model.predict([answers])

#     prediction = 0  # Placeholder for actual prediction logic
#     deployed_prompt_name = 'your-vellum-prompt-or-workflow-name'
#     try:
#         # Call the Vellum API with your prompt/workflow name and input variables
#         response = Vellum.generate_completion(
#             deployment_name=deployed_prompt_name,
#             prompt_variables={
#                 "user_input": user_answers, # Map your user input to the variable in your Vellum prompt
#             },
#         )

#         # Extract the AI's response from Vellum's output
#         ai_response = response.results[0].text # Adjust based on Vellum's actual response structure

#         return jsonify({
#             'prediction': prediction,
#             "responseFromAI": ai_response
#             })

#     except Exception as e:
#         print(f"Error calling Vellum API: {e}")
#         return jsonify({
#             'prediction': prediction,
#             "error": "Failed to get response from AI"
#             }), 500


if __name__ == '__main__':
    app.run(debug=True)
