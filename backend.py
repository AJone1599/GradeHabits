from flask import Flask, render_template, request, redirect, session

app = Flask(__name__, template_folder='FrontEnd')

@app.route('/')
def home_page():
    return render_template('homepage.html')

@app.route('/survey')
def survey_page():
    return render_template('survey.html')

@app.route('/results')
def results_page():
    return render_template('results.html')

if __name__ == '__main__':
    app.run(debug=True)
