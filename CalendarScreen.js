import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

export default function CalendarScreen() {
  const [sleepData, setSleepData] = useState({});
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [sleepHours, setSleepHours] = useState('');

  const logSleep = () => {
    if (!sleepHours || isNaN(sleepHours) || sleepHours <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of sleep hours.');
      return;
    }

    const updatedData = {
      ...sleepData,
      [selectedDate]: {
        marked: true,
        dotColor: 'purple',
        customStyles: {
          container: {
            backgroundColor: '#E061CB',
            borderRadius: 5,
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
        sleepHours: `${sleepHours} hrs`,
      },
    };

    setSleepData(updatedData);
    setSleepHours('');
    Alert.alert('Success', `Logged ${sleepHours} hours of sleep for ${selectedDate}.`);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markingType={'custom'}
        markedDates={Object.fromEntries(
          Object.entries(sleepData).map(([date, data]) => [
            date,
            { ...data, customStyles: { container: data.container, text: data.text } },
          ])
        )}
        theme={{
          calendarBackground: '#1d1447',
          todayTextColor: '#E061CB',
          dayTextColor: '#ccc',
          textSectionTitleColor: '#E061CB',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d1447',
  },
});
