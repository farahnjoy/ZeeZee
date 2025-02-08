import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Expo

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import TrackScreen from './TrackScreen';
import SocialScreen from './SocialScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#991044',
        tabBarInactiveTintColor: '#333',
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        headerTitle: 'ZeeZee', // Static app name
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Calendar':
              iconName = 'calendar-outline';
              break;
            case 'Track Sleep':
              iconName = 'bar-chart-outline';
              break;
            case 'Friends':
              iconName = 'people-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Track Sleep" component={TrackScreen} />
      <Tab.Screen name="Friends" component={SocialScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
