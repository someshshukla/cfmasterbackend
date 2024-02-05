const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DayModel = require('./models/dayModel');
const cors = require('cors');
const UserModel = require('./models/userModel');
const checkboxStateRoutes = require('./routes/checkboxStates');

const uri = 'mongodb+srv://mastercf:mastercf@mastercf.i5wvlsu.mongodb.net/mastercfdb?retryWrites=true&w=majority';

const app = express();
const PORT = process.env.PORT || 5000;

// Enabling CORS for all routes
app.use(cors());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Fetching days
app.get('/api/days', async (req, res) => {
    try {
        const days = await DayModel.find();
        console.log('Fetched Days:', days); // Log fetched data
        res.json(days);
    } catch (error) {
        console.error('Error fetching days: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Register
/*app.post('/api/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      //const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//login
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('login request recieved with username : ', username);
      const user = await UserModel.findOne({ username });
      console.log('User retrieved from the database:', user);

  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
      
    } catch (error) {
      console.error('Error logging in: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
*/

// Route to add a day
app.post('/api/days', async (req, res) => {
    const { dayNumber, date, plannedTasks, achievedTasks, challenges, notes } = req.body;

    try {
        // New instance of the DayModel
        const newDay = new DayModel({
            dayNumber,
            date,
            plannedTasks,
            achievedTasks,
            challenges,
            notes,
        });

        // Saving data to the database
        const savedDay = await newDay.save();

        res.json(savedDay);
    } catch (error) {
        console.error('Error adding day: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//checkbox routes
app.use('/api/checkboxStates', checkboxStateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
