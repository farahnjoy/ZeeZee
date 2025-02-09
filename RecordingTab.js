import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av'; // For audio recording
import axios from 'axios'; // For sending data to a server

function RecordingTab() {
  const [isRecording, setIsRecording] = useState(false);
  const [soundUri, setSoundUri] = useState(null);
  const [recording, setRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sleepAnalysis, setSleepAnalysis] = useState(null); // Store analysis results

  // Start recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need audio recording permissions to continue.');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  // Stop recording and process
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setSoundUri(uri);
        setRecording(null);
        setIsRecording(false);
        Alert.alert('Recording Stopped', 'Your sleep recording is ready for analysis.');

        // Analyze the sleep recording for patterns (AI processing)
        analyzeSleep(uri);
      }
    } catch (error) {
      console.log('Failed to stop recording', error);
    }
  };

  // Start playback of recorded sound
  const startPlayback = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
    await sound.playAsync();
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  // Stop playback
  const stopPlayback = async () => {
    if (isPlaying) {
      await sound.stop();  // Use stop() instead of stopAsync
      setIsPlaying(false);
    }
  };

  // Analyze sleep recording by sending it to the backend
  const analyzeSleep = async (uri) => {
    try {
      // Prepare audio file for upload
      const formData = new FormData();
      formData.append('audio', {
        uri,
        type: 'audio/wav', // Ensure the format matches the backend
        name: 'sleep_recording.wav',
      });

      // Log the FormData to check if it's correct
      console.log('FormData:', formData);

      // Send recording to backend API for analysis
      const response = await axios.post('http://192.168.56.1:5000/sleepAnalysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("API Response:", response.data);

      if (response.data) {
        setSleepAnalysis(response.data); // Set results into state
        Alert.alert('Analysis Complete', 'Your sleep analysis is ready.');
      }
    } catch (error) {
      console.log('Error in sleep analysis', error);
      Alert.alert('Error', 'There was an issue analyzing the recording.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#1d1447' }}>
      <Text style={{ color: '#ccc', fontSize: 16 }}>Record Sleep</Text>
      <TouchableOpacity
        style={{ backgroundColor: isRecording ? '#E061CB' : '#9B59B6', padding: 15, borderRadius: 5 }}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isRecording ? 'Stop Recording' : 'Record Sleep'}
        </Text>
      </TouchableOpacity>

      {/* Playback Controls */}
      {soundUri && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#ccc', fontSize: 16 }}>Playback Recording</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#9B59B6', padding: 15, borderRadius: 5 }}
            onPress={isPlaying ? stopPlayback : startPlayback}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {isPlaying ? 'Stop Playback' : 'Start Playback'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display Analysis Results */}
      {sleepAnalysis && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#ccc', fontSize: 16 }}>Sleep Analysis</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>
            Snoring Detected: {sleepAnalysis.snoring ? 'Yes' : 'No'}
          </Text>
          <Text style={{ color: 'white', marginTop: 5 }}>
            Sleep Quality: {sleepAnalysis.sleepQuality || 'Not Available'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default RecordingTab;
