// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors=require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up the mail transporter
app.get("/",async(req,res)=>{
  res.send("Yes iam working fine");
})

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'smtp.mailtrap.io'
  auth: {
    user: 'bhanukundarapu55@gmail.com', // Replace with your email
    pass: 'tzgz npyg neyx rrls'  // Replace with your email password or app password
  }
});

// POST route to send the contact form data
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'bhanukundarapu55@gmail.com', // Replace with the recipient email
    subject: `Message from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error);
    }
    return res.json({status:200,message:'Email sent'});
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
