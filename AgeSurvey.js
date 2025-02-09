import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Arrow icon

const AgeSurveyScreen = ({ navigation }) => {
    const [selectedAge, setSelectedAge] = useState(null);

    // Generate age options from 10 to 100
    const ageOptions = Array.from({ length: 91 }, (_, i) => 10 + i);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Age</Text>

            {/* Scrollable Age List */}
            <FlatList
                data={ageOptions}
                keyExtractor={(item) => item.toString()}
                style={styles.ageList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.ageItem, selectedAge === item && styles.selectedAge]} 
                        onPress={() => setSelectedAge(item)}
                    >
                        <Text style={[styles.ageText, selectedAge === item && styles.selectedAgeText]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity 
                style={styles.cloudButton} 
                onPress={() => {
                    if (selectedAge) {
                        navigation.navigate('Current Sleep', { age: selectedAge });
                    } else {
                        alert("Please select your age.");
                    }
                }}
            >
                <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default AgeSurveyScreen;

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
    ageList: {
        height: 250, 
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
    },
    ageItem: {
        padding: 15,
        alignItems: 'center',
    },
    selectedAge: {
        backgroundColor: '#8b5cf6',
        borderRadius: 10,
    },
    ageText: {
        fontSize: 18,
        color: '#333',
    },
    selectedAgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cloudButton: {
        backgroundColor: '#fff',
        width: 80,
        height: 50,
        borderRadius: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 6,
        marginTop: 20,
    },
});
