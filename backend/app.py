from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Set your Google Gemini API key here
genai.configure(api_key="AIzaSyDpr_IWrS_-7bzvsTKPoXq4A8ulEkoJUzA")

@app.route('/explain', methods=['POST'])
def explain_code():
    data = request.json
    code_snippet = data.get('code')
    language = data.get('language', 'Unknown')

    if not code_snippet:
        return jsonify({"error": "No code provided"}), 400

    # Dynamic prompt based on detected language
    if language == 'Python':
        prompt = f"Explain the following Python code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    elif language == 'C':
        prompt = f"Explain the following C code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    elif language == 'C++':
        prompt = f"Explain the following C++ code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    elif language == 'Java':
        prompt = f"Explain the following Java code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    elif language == 'JavaScript':
        prompt = f"Explain the following JavaScript code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    elif language == 'Swift':
        prompt = f"Explain the following Swift code step-by-step:\n\n{code_snippet}\n\nExplanation:"
    else:
        prompt = f"Explain the following code (language unknown) step-by-step:\n\n{code_snippet}\n\nExplanation:"

    try:
        # Use the latest Gemini model for explanation
        model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
        response = model.generate_content(prompt)

        explanation = response.text.strip()
        return jsonify({"explanation": explanation})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/models', methods=['GET'])
def list_models():
    try:
        models = genai.list_models()
        available_models = [model.name for model in models]
        return jsonify({"models": available_models})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
