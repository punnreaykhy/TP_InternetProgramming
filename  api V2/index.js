const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jsonfile = require('jsonfile');


const app = express();
const port = 3000;
const usersFile = 'users.json'; // This is the JSON file that will store user information
const JWT_SECRET = 'my-secret-key'; // You can change this to any secret key you like

app.use(bodyParser.json());
app.use(cors());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;

    // Check if user already exists
    const users = await jsonfile.readFile(usersFile);
    const user = users.find((u) => u.username === username);
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, firstName, lastName, email};
    users.push(newUser);
    await jsonfile.writeFile(usersFile, users);
    res.json({ message: 'User registered successfully' });
    // res.send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const users = await jsonfile.readFile(usersFile);
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET);
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});