from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from environment variable
API_KEY = os.getenv('GOOGLE_API_KEY')
if not API_KEY:
    raise Exception("Missing Google API key in environment variables")
genai.configure(api_key=API_KEY)

@app.route("/", methods=["GET"])
def home():
    return "✅ Code Explainer Backend is Running!"

@app.route('/explain', methods=['POST'])
def explain_code():
    try:
        data = request.json
        code_snippet = data.get('code')
        language = data.get('language', 'Unknown')

        if not code_snippet:
            return jsonify({"error": "No code provided"}), 400

        prompt = f"Explain the following {language} code step-by-step:\n\n{code_snippet}\n\nExplanation:"
        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        explanation = response.text.strip()

        return jsonify({"explanation": explanation})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
