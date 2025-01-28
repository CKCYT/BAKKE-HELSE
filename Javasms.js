const express = require('express');
const Twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Twilio credentials (replace with your actual values)
const ACCOUNT_SID = 'your_account_sid';
const AUTH_TOKEN = 'your_auth_token';
const TWILIO_PHONE_NUMBER = 'your_twilio_phone_number';

const client = Twilio(ACCOUNT_SID, AUTH_TOKEN);

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route to handle SMS sending
app.post('/send-sms', (req, res) => {
    const { phone, message } = req.body;

    client.messages.create({
        body: message,
        to: phone, // Text this number
        from: TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
        res.json({ success: true, sid: message.sid });
    })
    .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
