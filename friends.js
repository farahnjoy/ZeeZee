const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Dummy user data (In a real app, you would use a database)
const users = {
  'friend@example.com': { score: 75 },
  'otherfriend@example.com': { score: 85 },
};

// Dummy invitation data
const invitations = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to send invitation
app.post('/invite', (req, res) => {
  const { friendEmail } = req.body;

  // Check if the friend is a registered user
  if (users[friendEmail]) {
    // Create a new invitation
    invitations.push({
      friendEmail,
      status: 'Pending',
    });
    return res.json({ success: true });
  }

  return res.status(400).json({ success: false, message: 'Friend is not registered' });
});

// Endpoint to get friend's score (when they accept)
app.get('/getScore', (req, res) => {
  const { email } = req.query;

  if (users[email]) {
    return res.json({ score: users[email].score });
  }

  return res.status(404).json({ message: 'Friend not found' });
});

// Endpoint to accept invitation (status update)
app.post('/acceptInvitation', (req, res) => {
  const { friendEmail } = req.body;

  // Find the invitation and update status
  const invitation = invitations.find(
    (invitation) => invitation.friendEmail === friendEmail && invitation.status === 'Pending'
  );

  if (invitation) {
    invitation.status = 'Accepted';
    return res.json({ success: true, message: 'Invitation accepted' });
  }

  return res.status(400).json({ success: false, message: 'Invitation not found or already accepted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
