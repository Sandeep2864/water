import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Create connection with the cloud database
const mongoURI = 'mongodb+srv://Sandeep41800:9T8jyUkQOc7S4bEx@cluster0.ppgo7xs.mongodb.net/Popcorn?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define a schema for the users
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('users', userSchema);

// Define a schema for the bookings
const bookingSchema = new mongoose.Schema({
  email: String,
  item: String,
});

const Booking = mongoose.model('bookings', bookingSchema);

// API endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// API endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user document
    const newUser = new User({ email, password });

    // Save the user document to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// API endpoint for popcorn booking
app.post('/book/popcorn', async (req, res) => {
  try {
    const { email } = req.body;

    // Create a new popcorn booking document
    const newBooking = new Booking({ email, item: 'Popcorn' });

    // Save the popcorn booking document to the database
    await newBooking.save();

    res.status(200).json({ message: 'Popcorn booking successful' });
  } catch (error) {
    console.error('Error during popcorn booking:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// API endpoint for cool drink booking
app.post('/book/cooldrink', async (req, res) => {
  try {
    const { email } = req.body;

    // Create a new cool drink booking document
    const newBooking = new Booking({ email, item: 'Cool Drink' });

    // Save the cool drink booking document to the database
    await newBooking.save();

    res.status(200).json({ message: 'Cool drink booking successful' });
  } catch (error) {
    console.error('Error during cool drink booking:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Node.js is currently active and listening on port ${port}`);
});
