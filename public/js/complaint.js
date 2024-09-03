const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Setup mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ' add your nodemailer id',
        pass: ' add your nodemailer pass key '
    }
});

// Route to handle complaint form submission
router.post('/submit-complaint', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Setup email data
    const mailOptions = {
        from: email,
        to: 'official-authority-email@example.com', // replace with actual authority email
        subject: `Complaint from ${name}: ${subject}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error submitting complaint.');
        }
        res.send('Complaint submitted successfully.');
    });
});

module.exports = router;
