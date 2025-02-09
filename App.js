import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Expo
import { View, StyleSheet, Image } from 'react-native';

// Import screens
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import AgeSurvey from './AgeSurvey';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import CurrentSleep from './CurrentSleep';
import SleepTargetSurvey from './SleepTargetSurvey';
import SleepSatisfaction from './SleepSatisfaction';
import OfficialSignUp from './OfficialSignUp';
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
        tabBarStyle: { backgroundColor: '#f4f4f4' }, // Tab bottom color
        headerTitle: () => (
          <Image
            source={require('./assets/zeezee.png')}
            style={{ width: 100, height: 40 }} // Adjust size of the image as needed
          />
        ),
        headerStyle: { backgroundColor: '#1d1447' },
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
      <Stack.Navigator initialRouteName="Welcome">
        {/* Other Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={SignupScreen} />
        <Stack.Screen name="Age" component={AgeSurvey} />
        <Stack.Screen name="Current Sleep" component={CurrentSleep} />
        <Stack.Screen name="Sleep Target" component={SleepTargetSurvey} />
        <Stack.Screen name="Sleep Satisfaction" component={SleepSatisfaction} />
        <Stack.Screen name="Sign Up!" component={OfficialSignUp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

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
