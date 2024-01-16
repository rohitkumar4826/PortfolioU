require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Message = require('./models/Message'); 
const cors = require("cors");
const port=process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static(__dirname+"/build"));
app.use(cors());
mongoose.connect(process.env.Mongo_link)
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });

  app.get("/",(req,res)=>
  {
    res.sendFile(__dirname+"/build/index.html")
  })

// Protected Route
app.post('/contact',
async (req, res) => {
    console.log('inside contact');
    // const { userId } = req.user;
    const { name, email, message } = req.body;
  
    try {
      // Create a new message with the user's ID
      const newMessage = new Message({
        // userId,
        name,
        email,
        message,
      });
  
      // Save the message to the database
      const savedMessage = await newMessage.save();
     console.log("hello you are allowed");
      res.json({ success: true, message: 'Message sent successfully', savedMessage });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  
app.get('*',(req,res)=>
{
  res.sendFile(__dirname+'/build/index.html')
})
app.listen(port, () => {
  console.log("Server is running");
});
