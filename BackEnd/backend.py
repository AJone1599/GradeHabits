from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get('features', [0, 0, 0])
    # Dummy prediction logic: sum the features
    print(features)
    prediction = sum(features)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
