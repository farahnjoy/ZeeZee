import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground } from 'react-native';
import backgroundImage from './assets/Background.png';

import angryDragon from './assets/angry-dragon.png';
import sadDragon from './assets/sad-dragon.png';
import annoyedDragon from './assets/annoyed-dragon.png';
import sleepingDragon from './assets/sleeping-dragon.png';

export default function HomeScreen() {

  const [sleepScore, setSleepScore] = useState('');

  let dragonImage;
  if (sleepScore >= 90) {
    dragonImage = sleepingDragon;
  } else if (sleepScore >= 80) {
    dragonImage = annoyedDragon;
  } else if (sleepScore >= 60) {
    dragonImage = sadDragon;
  } else {
    dragonImage = angryDragon;
  }
  
  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Enter Sleep Score (0-100):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sleepScore}
          onChangeText={setSleepScore}
          maxLength={3}
        />
        {sleepScore !== '' && (
          <Image source={dragonImage} style={styles.dragonImage} />
        )}
      </View>
    </ImageBackground>
  );

}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: 100,
    padding: 8,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  dragonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
