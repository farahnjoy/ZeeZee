import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the arrow icon

const SleepSatisfaction = ({ navigation, route }) => {
    const [satisfaction, setSatisfaction] = useState(''); // Track the selected satisfaction level

    const satisfactionOptions = [
        { label: 'Extremely Satisfied', emoji: '😊' },
        { label: 'Satisfied', emoji: '🙂' },
        { label: 'Neutral', emoji: '😐' },
        { label: 'Unsatisfied', emoji: '🙁' },
        { label: 'Extremely Unsatisfied', emoji: '😞' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How Satisfied Are You with Your Sleep?</Text>

            {/* Render satisfaction options with emojis */}
            {satisfactionOptions.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        satisfaction === option.label && styles.selectedButton, 
                    ]}
                    onPress={() => setSatisfaction(option.label)} 
                >
                    <Text style={styles.optionText}>
                        {option.label} {option.emoji}
                    </Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    if (satisfaction) {
                        navigation.navigate('Sign Up!', { satisfaction }); 
                    } else {
                        alert('Please select your satisfaction level.');  
                    }
                }}
            >
                <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default SleepSatisfaction;

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
        marginBottom: 30,
    },
    optionButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    selectedButton: {
        backgroundColor: '#8b5cf6', // Highlight selected button
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d1447',
    },
    nextButton: {
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
        marginTop: 30,
    },
});
