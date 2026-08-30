const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'Instagram API is running'
    });
});

// Signup
app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const existingUser = users.find(
        user => user.email === email
    );

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

    res.status(201).json({
        message: 'Signup successful',
        user: {
            username,
            email
        }
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    res.json({
        message: 'Login successful',
        user: {
            username: user.username,
            email: user.email
        }
    });
});

// Local development
const PORT = 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export Express app for Vercel
module.exports = app;