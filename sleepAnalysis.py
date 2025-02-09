from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import librosa
import numpy as np
import os
import shutil

app = Flask(__name__)
CORS(app)

# Load the trained AI model
model_path = 'snoring_detection_model.h5'
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found at path: {model_path}")
model = tf.keras.models.load_model(model_path)

def preprocess_audio(file_path):
    try:
        audio, sr = librosa.load(file_path, sr=None)
        mfcc = librosa.feature.mfcc(audio, sr=sr, n_mfcc=13)
        return np.mean(mfcc.T, axis=0)
    except Exception as e:
        raise ValueError(f"Audio preprocessing failed: {e}")

# Change the route here to '/sleepAnalysis'
@app.route('/sleepAnalysis', methods=['POST'])
def analyze_sleep():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400

        audio_file = request.files['audio']

        # Handle file saving and MIME type validation
        audio_filename = 'sleep_recording.wav'
        audio_path = os.path.join('./', audio_filename)
        audio_file.save(audio_path)
        print(f"File saved at: {audio_path}")  

        # Preprocess and analyze the audio
        audio_features = preprocess_audio(audio_path)
        prediction = model.predict(np.expand_dims(audio_features, axis=0))

        snoring_detected = int(prediction[0] > 0.5)
        sleep_quality = 'Good' if snoring_detected == 0 else 'Poor'

        return jsonify({'snoring': snoring_detected, 'sleepQuality': sleep_quality})

    except ValueError as ve:
        print(f"Audio Error: {ve}")
        return jsonify({'error': f'Audio Processing Error: {ve}'}), 500
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({'error': f'Server Error: {e}'}), 503

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
