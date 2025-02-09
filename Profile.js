import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import backgroundImage from './assets/Background.png';

import angryDragon from './assets/angry-dragon.png';
import sadDragon from './assets/sad-dragon.png';
import annoyedDragon from './assets/annoyed-dragon.png';
import sleepingDragon from './assets/sleeping-dragon.png';

function parseTime(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

function getRecommendedSleep(age, activityLevel) {
    let minSleep, maxSleep;
    if (age <= 1) { minSleep = 720; maxSleep = 1020; }
    else if (age <= 2) { minSleep = 660; maxSleep = 840; }
    else if (age <= 5) { minSleep = 600; maxSleep = 780; }
    else if (age <= 13) { minSleep = 540; maxSleep = 660; }
    else if (age <= 17) { minSleep = 480; maxSleep = 600; }
    else if (age <= 64) { minSleep = 420; maxSleep = 540; }
    else { minSleep = 360; maxSleep = 480; }

    if (activityLevel === "high") { minSleep += 60; maxSleep += 60; }
    else if (activityLevel === "athlete") { minSleep += 120; maxSleep += 120; }

    return { minSleep, maxSleep };
}

function getREMPercentage(age) {
    if (age <= 1) return 50;
    if (age <= 2) return 40;
    if (age <= 5) return 30;
    if (age <= 13) return 25;
    if (age <= 17) return 23;
    if (age <= 64) return 20;
    return 18;
}

function calculateSleepMetrics(age, sleepStart, sleepEnd, numAwakenings, awakeningDuration, activityLevel) {
    let startMinutes = parseTime(sleepStart);
    let endMinutes = parseTime(sleepEnd);
    if (endMinutes < startMinutes) endMinutes += 1440;

    let timeInBed = endMinutes - startMinutes;
    let minutesAwake = numAwakenings * awakeningDuration;
    let minutesAsleep = timeInBed - minutesAwake;

    let remPercentage = getREMPercentage(age) / 100;
    let remSleep = remPercentage * minutesAsleep;
    let deepSleep = 0.20 * minutesAsleep;
    let lightSleep = minutesAsleep - (remSleep + deepSleep);

    let { minSleep, maxSleep } = getRecommendedSleep(age, activityLevel);

    return { timeInBed, minutesAwake, minutesAsleep, remSleep, deepSleep, lightSleep, minSleep, maxSleep };
}

function calculateSleepScore(age, sleepMetrics, desiredSleep) {
    let { minutesAsleep, timeInBed, deepSleep, remSleep, minSleep, maxSleep } = sleepMetrics;

    let sleepEfficiency = (minutesAsleep / timeInBed) * 40;
    let depthScore = ((deepSleep + remSleep) / minutesAsleep) * 20;

    let durationScore = 0;
    if (minutesAsleep >= minSleep && minutesAsleep <= maxSleep) { durationScore = 20; }
    else if (minutesAsleep > maxSleep) { durationScore = Math.max(10, 20 - ((minutesAsleep - maxSleep) / 30)); }
    else { durationScore = Math.max(10, (minutesAsleep / minSleep) * 20); }

    let sleepDifference = Math.abs(minutesAsleep - desiredSleep);
    let sleepDifferenceScore = Math.max(0, 10 - (sleepDifference / 30));

    let sleepScore = sleepEfficiency + depthScore + durationScore + sleepDifferenceScore;
    return Math.round(Math.max(0, Math.min(sleepScore, 100)));
}

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [numAwakenings, setNumAwakenings] = useState('');
  const [awakeningDuration, setAwakeningDuration] = useState('');
  const [activityLevel, setActivityLevel] = useState('normal');
  const [desiredSleep, setDesiredSleep] = useState('');
  const [sleepScore, setSleepScore] = useState(null);

  const calculateScore = () => {
          if (age && sleepStart && sleepEnd && numAwakenings && awakeningDuration && desiredSleep) {
              let sleepMetrics = calculateSleepMetrics(
                  parseInt(age),
                  sleepStart,
                  sleepEnd,
                  parseInt(numAwakenings),
                  parseInt(awakeningDuration),
                  activityLevel
              );
              let score = calculateSleepScore(parseInt(age), sleepMetrics, parseInt(desiredSleep));
              setSleepScore(score);
          }
  };

  let dragonImage;
  if (sleepScore !== null) {
      if (sleepScore >= 90) { dragonImage = sleepingDragon; }
      else if (sleepScore >= 80) { dragonImage = annoyedDragon; }
      else if (sleepScore >= 60) { dragonImage = sadDragon; }
      else { dragonImage = angryDragon; }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Enter Age:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

        <Text style={styles.text}>Sleep Start (HH:MM):</Text>
        <TextInput style={styles.input} value={sleepStart} onChangeText={setSleepStart} />

        <Text style={styles.text}>Sleep End (HH:MM):</Text>
        <TextInput style={styles.input} value={sleepEnd} onChangeText={setSleepEnd} />

        <Text style={styles.text}>Number of Awakenings:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={numAwakenings} onChangeText={setNumAwakenings} />

        <Text style={styles.text}>Awakening Duration (min):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={awakeningDuration} onChangeText={setAwakeningDuration} />

        <Text style={styles.text}>Desired Sleep Duration (min):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={desiredSleep} onChangeText={setDesiredSleep} />

        <Text style={styles.text}>Activity Level:</Text>
        <Picker selectedValue={activityLevel} onValueChange={setActivityLevel} style={styles.picker}>
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Athlete" value="athlete" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={calculateScore}>
          <Text style={styles.buttonText}>Calculate Sleep Score</Text>
        </TouchableOpacity>

        {sleepScore !== null && (
          <>
            <Text style={styles.text}>Sleep Score: {sleepScore}</Text>
            <Image source={dragonImage} style={styles.dragonImage} />
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, borderRadius: 10, alignItems: 'center' },
  text: { fontSize: 18, color: '#fff', marginBottom: 10 },
  input: { backgroundColor: '#fff', width: 100, padding: 8, borderRadius: 5, textAlign: 'center', fontSize: 18, marginBottom: 10 },
  button: { backgroundColor: '#991044', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
  dragonImage: { width: 150, height: 150, resizeMode: 'contain', marginTop: 10 },
  picker: { width: 150, backgroundColor: '#fff', marginBottom: 10 }
});
