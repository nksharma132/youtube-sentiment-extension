from flask import Flask, request, jsonify
from flask_cors import CORS
from model import analyze_comments

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    comments = data.get('comments', [])
    if not comments:
        return jsonify({"error": "No comments provided"}), 400
    
    result = analyze_comments(comments)
    return jsonify(result['sentiment'])

if __name__ == '__main__':
    app.run(debug=True)
