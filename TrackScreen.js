import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Alert, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av'; // For audio recording

import RecordingTab from './RecordingTab';

// First Tab - User Inputs
function UserInputsTab({ navigation }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [awakenings, setAwakenings] = useState(0);
  const [avgAwakeningDuration, setAvgAwakeningDuration] = useState('');

  const currentDate = format(new Date(), 'MMMM dd, yyyy');
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [startDateSelected, setStartDateSelected] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(false);

  const onChangeStartTime = (event, selectedDate) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedDate) setStartTime(selectedDate);
  };

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartTime(selectedDate);
      setStartDateSelected(true);
    }
  };

  const onChangeEndTime = (event, selectedDate) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedDate) setEndTime(selectedDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndTime(selectedDate);
      setEndDateSelected(true);
    }
  };

  const [dataStorage, setDataStorage] = useState([]);
  const handleSubmit = () => {
    if (!avgAwakeningDuration) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    const newEntry = {
    startTime: format(startTime, 'MMMM dd, yyyy hh:mm a'),
    endTime: format(endTime, 'MMMM dd, yyyy hh:mm a'),
    awakenings,
    avgAwakeningDuration,
    };
    setDataStorage([...dataStorage, newEntry]); 

    Alert.alert(
      'Details Saved',
      ` 
      Start Sleep: ${format(startTime, 'MMMM dd, yyyy hh:mm a')}
      End Sleep: ${format(endTime, 'MMMM dd, yyyy hh:mm a')}
      Number of Awakenings: ${awakenings}
      Average Duration of Awakenings: ${avgAwakeningDuration} min`
    );
    navigation.navigate('Calendar', { sleepData: [...dataStorage, newEntry] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Start Sleep Time</Text>
        <View style={styles.timeDateRow}>
          <TouchableOpacity style={styles.purpleButton} onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.buttonText}>
              {startDateSelected ? format(startTime, 'MMMM dd, yyyy') : currentDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.purpleButton} onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.buttonText}>{format(startTime, 'hh:mm a')}</Text>
          </TouchableOpacity>
        </View>
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="spinner"
            onChange={onChangeStartTime}
          />
        )}
        {showStartDatePicker && (
          <DateTimePicker
            value={startTime}
            mode="date"
            display="calendar"
            onChange={onChangeStartDate}
          />
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>End Sleep Time</Text>
        <View style={styles.timeDateRow}>
          <TouchableOpacity style={styles.purpleButton} onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.buttonText}>
              {endDateSelected ? format(endTime, 'MMMM dd, yyyy') : currentDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.purpleButton} onPress={() => setShowEndTimePicker(true)}>
            <Text style={styles.buttonText}>{format(endTime, 'hh:mm a')}</Text>
          </TouchableOpacity>
        </View>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="spinner"
            onChange={onChangeEndTime}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            value={endTime}
            mode="date"
            display="calendar"
            onChange={onChangeEndDate}
          />
        )}
      </View>

      <View style={styles.spinnerRow}>
        <Text style={styles.label}>Number of Awakenings</Text>
        <View style={styles.spinnerContainer}>
          <TouchableOpacity style={styles.spinnerButton} onPress={() => setAwakenings(Math.max(awakenings - 1, 0))}>
            <Text style={styles.spinnerButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.awakeningText}>{awakenings}</Text>
          <TouchableOpacity style={styles.spinnerButton} onPress={() => setAwakenings(awakenings + 1)}>
            <Text style={styles.spinnerButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Average Duration of Awakenings (minutes)</Text>
        <TextInput
          style={[styles.input, { color: '#FFFFFF' }]}
          value={avgAwakeningDuration}
          onChangeText={setAvgAwakeningDuration}
          placeholder="Enter duration in minutes"
          placeholderTextColor="#FFFFFF" 
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>

  
  );
}


// Tab Navigator
const Tab = createMaterialTopTabNavigator();

export default function TrackScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1d1447', // Set background color of top tab bar
        },
        tabBarLabelStyle: {
          color: 'white', // Set text color
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen name="User Inputs" component={UserInputsTab} />
      <Tab.Screen name="Recording" component={RecordingTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d1447',
  },
  label: {
    fontSize: 16,
    color: '#ccc',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  row: {
    marginVertical: 15,
  },
  timeDateRow: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  spinnerRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerButton: {
    backgroundColor: '#9B59B6',
    padding: 10,
    borderRadius: 5,
  },
  spinnerButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  awakeningText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: '#ccc',
  },
  inputRow: {
    marginTop: 10,
    color:'white',
  },
  purpleButton: {
    backgroundColor: '#9B59B6',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#E061CB',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
