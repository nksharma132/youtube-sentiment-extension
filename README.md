# YouTube Sentiment Analysis Chrome Extension 🎥🔍

A Chrome Extension that **collects comments from any YouTube video**, sends them to a **Flask-based server**, runs a **Machine Learning sentiment analysis model**, and returns **positive, neutral, and negative sentiment scores** with a live chart visualization.

---

## 🚀 Features
- 📥 **Extract all comments** from the currently opened YouTube video.  
- 🔗 **Send data to a Python Flask API** running a trained ML model.  
- 📊 **Display sentiment analysis** in percentage (Positive, Neutral, Negative).  
- 🖌 **Interactive chart** to visualize the sentiment distribution.  

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Chrome Extension APIs)
- **Backend**: Flask (Python)
- **ML**: Scikit-learn (with trained sentiment analysis model)
- **Other**: Flask-CORS, Joblib, Pandas, Numpy

---

## 📂 Project Structure
youtube-sentiment-extension/
│
├── extension/
│ ├── manifest.json
│ ├── popup.html
| ├── icon.png
│ ├── popup.js
│ ├── content.js
│ └── background.js
│
├── server/
│ ├── server.py
| ├── requirements.txt
│ ├── model.py 
| └── emotions.txt
│
└── README.md # Documentation (this file)

---

## ⚙️ Setup and Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nksharma132/youtube-sentiment-extension.git
cd youtube-sentiment-extension


### 2️⃣ Setup Python Virtual Environment
python -m venv sentimentenev
sentimentenev\Scripts\activate   # On Windows
# or
source sentimentenev/bin/activate   # On macOS/Linux


### 3️⃣ Install Dependencies
pip install -r requirements.txt



### 4️⃣ Start Flask Server
cd server
python app.py


### 5️⃣ Load Extension in Chrome

Open chrome://extensions/
Enable Developer Mode (top-right corner)
Click Load unpacked
Select the extension/ folder


### ▶️ Usage

Open a YouTube video.
Click the extension icon.
Hit Analyze Comments.
View the sentiment breakdown and chart visualization instantly!


🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.