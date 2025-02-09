import os
import librosa
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam

# Path to the directory with audio files
audio_dir = './'  # Assuming the .wav files are in the same directory as the script

# Parameters for MFCC extraction
n_mfcc = 13  # Number of MFCC features
duration = 5  # Audio duration to consider in seconds (can adjust based on your data)

# Function to extract MFCC from an audio file
def extract_mfcc(file_path):
    try:
        # Load the audio file
        audio, sr = librosa.load(file_path, sr=None, duration=duration)
        # Extract MFCC features
        mfcc = librosa.feature.mfcc(audio, sr=sr, n_mfcc=n_mfcc)
        # Take the mean of the MFCC coefficients across time
        mfcc_mean = np.mean(mfcc.T, axis=0)
        return mfcc_mean
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

# Load the data and labels
def load_data(audio_dir):
    X = []
    y = []

    # Process snoring audio files (assumed to start with 'snoring')
    for file_name in os.listdir(audio_dir):
        if file_name.endswith('.wav'):
            file_path = os.path.join(audio_dir, file_name)
            mfcc = extract_mfcc(file_path)
            if mfcc is not None:
                if 'snoring' in file_name.lower():
                    X.append(mfcc)
                    y.append(1)  # Snoring label
                else:
                    X.append(mfcc)
                    y.append(0)  # Non-snoring label

    # Convert lists to numpy arrays
    X = np.array(X)
    y = np.array(y)

    return X, y

# Load data
X, y = load_data(audio_dir)

# Split the data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the model
model = Sequential([
    Dense(64, activation='relu', input_shape=(n_mfcc,)),  # Input layer (13 MFCC features)
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')  # Output layer (binary classification)
])

# Compile the model
model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

# Save the trained model
model.save('snoring_detection_model.h5')

# Evaluate the model on the test data
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc * 100:.2f}%")
