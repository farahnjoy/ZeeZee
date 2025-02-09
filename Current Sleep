import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CurrentSleep = ({ navigation }) => {
    const [sleepHours, setSleepHours] = useState(8); 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Your Average Sleep Hours</Text>

            <ScrollView 
                horizontal 
                style={styles.scrollContainer} 
                contentContainerStyle={styles.scrollContentContainer}
            >
                {[...Array(13).keys()].map((hour) => (
                    <TouchableOpacity
                        key={hour}
                        style={[
                            styles.button,
                            sleepHours === hour && styles.selectedButton, 
                        ]}
                        onPress={() => setSleepHours(hour)}
                    >
                        <Text style={styles.buttonText}>{hour} hrs</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Display selected sleep hours */}
            <Text style={styles.sleepHoursText}>{sleepHours} hrs</Text>

            {/* Next Button to navigate to SleepTargetSurvey */}
            <TouchableOpacity 
                style={styles.cloudButton} 
                onPress={() => {
                    navigation.navigate('Sleep Target', { sleepHours });  
                }}
            >
                <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default CurrentSleep;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1447',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8b5cf6',
        marginBottom: 20,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    scrollContentContainer: {
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#8b5cf6', 
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d1447',
    },
    sleepHoursText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8b5cf6',
        marginTop: 10,
    },
    cloudButton: {
        backgroundColor: '#8b5cf6',
        width: 80,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 6,
    },
});
