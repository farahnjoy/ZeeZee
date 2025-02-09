import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import axios from 'axios'; // For sending data to the server

export default function SocialScreen({ navigation }) {
  const [friendEmail, setFriendEmail] = useState('');
  const [invites, setInvites] = useState([]); // List of sent invitations
  const [userScore, setUserScore] = useState(80); // Example user score (this can come from a user profile)
  const [friendScore, setFriendScore] = useState(null); // Store friend's score when they accept the invitation

  // Send an invitation to a friend
  const sendInvite = async () => {
    if (!friendEmail) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/invite', { friendEmail });
      if (response.data.success) {
        setInvites([...invites, { friendEmail, status: 'Pending' }]); // Add to invites list
        Alert.alert('Invitation Sent', 'Your friend has been invited!');
      } else {
        Alert.alert('Error', 'Failed to send invitation.');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      Alert.alert('Error', 'Something went wrong while sending the invitation.');
    }
  };

  // Accept the invitation (For your friend)
  const acceptInvite = (friendEmail) => {
    setInvites(invites.map(invite => 
      invite.friendEmail === friendEmail ? { ...invite, status: 'Accepted' } : invite
    ));
    // Assume friend accepted the invitation and now we fetch their score
    fetchFriendScore(friendEmail);
  };

  // Fetch friend's score after accepting invite
  const fetchFriendScore = async (friendEmail) => {
    try {
      const response = await axios.get(`http://localhost:5000/getScore?email=${friendEmail}`);
      if (response.data.score !== undefined) {
        setFriendScore(response.data.score); // Set friend's score when available
        Alert.alert('Score Received', `Your friend's sleep score is: ${response.data.score}`);
      } else {
        Alert.alert('Error', 'Unable to fetch friend\'s score.');
      }
    } catch (error) {
      console.error('Error fetching friend\'s score:', error);
      Alert.alert('Error', 'Something went wrong while fetching the score.');
    }
  };

  // Display the competition results
  const displayResult = () => {
    if (friendScore !== null) {
      const winner = userScore > friendScore ? 'You' : 'Your friend';
      return (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>
            Winner: {winner}!
          </Text>
          <Text style={{ fontSize: 16, color: 'white' }}>
            Your Score: {userScore} | Friend's Score: {friendScore}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#1d1447' }}>
      <Text style={{ fontSize: 20, color: '#ccc' }}>Social Screen</Text>

      {/* Invite Friend */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          paddingLeft: 10,
          color: 'white',
        }}
        placeholder="Enter friend's email"
        placeholderTextColor="gray"
        value={friendEmail}
        onChangeText={setFriendEmail}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#9B59B6',
          padding: 15,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={sendInvite}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Send Invitation</Text>
      </TouchableOpacity>

      {/* Invitations List */}
      <Text style={{ color: '#ccc', marginTop: 30 }}>Sent Invitations:</Text>
      <FlatList
        data={invites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: '#9B59B6',
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>Friend: {item.friendEmail}</Text>
            <Text style={{ color: 'white' }}>Status: {item.status}</Text>
            {item.status === 'Pending' && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#8E44AD',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5,
                }}
                onPress={() => acceptInvite(item.friendEmail)}
              >
                <Text style={{ color: 'white' }}>Accept Invite</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Display competition results */}
      {displayResult()}
    </View>
  );
}
