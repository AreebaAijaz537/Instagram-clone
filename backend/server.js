const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Temporary users list
// This is for testing only. Users will disappear when the server restarts.
const users = [];

// HOME
app.get('/', (req, res) => {
    res.send('Instagram API is running');
});

// SIGNUP
app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body;

    console.log('Signup request:', username, email);

    // Check required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            message: 'Email already registered'
        });
    }

    // Create user
    const newUser = {
        username,
        email,
        password
    };

    users.push(newUser);

    console.log('User registered:', email);

    res.status(201).json({
        message: 'Signup successful',
        user: {
            username,
            email
        }
    });
});

// LOGIN
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Login request:', email);

    // Find user
    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    console.log('Login successful:', email);

    res.json({
        message: 'Login successful',
        user: {
            username: user.username,
            email: user.email
        }
    });
});

// START SERVER
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});