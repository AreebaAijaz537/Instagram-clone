// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const API_URL = 'http://localhost:5000';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/signup`,
                formData
            );

            console.log('Signup Response:', response.data);

            setMessage(
                response.data.message || 'Account created successfully!'
            );

            setFormData({
                username: '',
                email: '',
                password: ''
            });

        } catch (error) {
            console.log('Signup Error:', error);

            setError(
                error.response?.data?.message ||
                'Unable to connect to server'
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">

            <div className="signup-box">

                <h1 className="logo">Instagram</h1>

                <p className="signup-text">
                    Sign up to see photos and videos from your friends.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Signup;