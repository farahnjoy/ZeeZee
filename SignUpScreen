import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the arrow icon

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('./assets/DragonLogo.png')} style={{ width: 350, height: 175 }} />
            </View>

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome!</Text>

            <Text style={styles.subText}>Let's get started</Text>

            {/* Cloud Button with Navigation to AgeSurvey */}
            <TouchableOpacity 
                style={styles.cloudButton} 
                onPress={() => navigation.navigate('Age')} 
            >
                <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.accountText}>I already have an account.</Text>

            {/* Sign-In Button */}
            <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigation.navigate('Login')} // Navigate to Login screen
            >
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1447',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        position: 'absolute',
        top: 80, // Adjust spacing for logo
    },
    logo: {
        width: 100,
        height: 100,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8b5cf6', // Cute lavender color
        marginBottom: 10,
    },
    subText: {
        fontSize: 18,
        color: '#6d28d9',
        marginBottom: 30,
    },
    cloudButton: {
        backgroundColor: '#fff',
        width: 80,
        height: 50,
        borderRadius: 30, // Cloud-like round shape
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 6,
        marginBottom: 20,
    },
    accountText: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 10,
    },
    signInButton: {
        backgroundColor: '#fca5a5', // Soft pink button
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    signInText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
