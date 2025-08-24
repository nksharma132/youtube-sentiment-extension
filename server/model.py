import string
from collections import Counter
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def analyze_comments(comments):
    if isinstance(comments, list):
        text = " ".join(comments)
    else:
        text = comments
    # Convert to lowercase
    lower_case = text.lower()

    # Remove punctuation
    cleaned_text = lower_case.translate(str.maketrans('', '', string.punctuation))

    # Tokenize
    tokenized_words = word_tokenize(cleaned_text, "english")

    # Remove stopwords
    final_words = [word for word in tokenized_words if word not in stopwords.words('english')]

    # Load emotion list
    emotion_list = []
    with open('server/emotions.txt', 'r', encoding='utf-8') as file:
        for line in file:
            clean_line = line.replace("\n", '').replace(",", '').replace("'", '').strip()
            if ": " in clean_line:
                word, emotion = clean_line.split(": ")
                if word in final_words:
                    emotion_list.append(emotion)

    # Count emotions
    word_count = Counter(emotion_list)

    # Sentiment using VADER
    analyzer = SentimentIntensityAnalyzer()
    sentiment = analyzer.polarity_scores(cleaned_text)

    return {
        "sentiment": sentiment,
        "emotions": dict(word_count)
    }