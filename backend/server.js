const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.get('/', (req, res) => {
    res.send('Instagram API is running');
});

app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body;

    console.log('Signup request:', username, email);

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            message: 'Email already registered'
        });
    }

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

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Login request:', email);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});