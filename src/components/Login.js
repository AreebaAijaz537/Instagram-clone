// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = 'https://instagram-clone-backend-drab.vercel.app';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    email: formData.username,
                    password: formData.password
                }
            );

            console.log('Login Response:', response.data);

            navigate('/home');

        } catch (error) {
            console.log('Login Error:', error);

            setError(
                error.response?.data?.message ||
                'Unable to connect to server'
            );

        } finally {
            setIsLoading(false);
        }
    };

    // Facebook login
    const handleFacebookLogin = () => {
        console.log('Facebook login clicked');
    };

    // Forgot password
    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    // Go to Signup page
    const handleSignup = () => {
        navigate('/signup');
    };

    // App Store
    const handleAppStore = () => {
        console.log('App Store clicked');
    };

    // Google Play
    const handleGooglePlay = () => {
        console.log('Google Play clicked');
    };

    return (
        <div className="container">

            {/* Left side: Phone mockup */}
            <div className="phone-section">
                <div className="phone-mockup">
                    <div className="phone-screen">
                        <img
                            src="/insta.png"
                            alt="Instagram Feed"
                        />
                    </div>
                </div>
            </div>

            {/* Right side: Login/Signup forms */}
            <div className="form-section">

                {/* Login Box */}
                <div className="login-box">

                    <h1 className="logo">Instagram</h1>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="username"
                            placeholder="Mobile number, username or email"
                            className="input-field"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input-field"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    {/* Facebook Login */}
                    <div className="facebook-login">
                        <button
                            onClick={handleFacebookLogin}
                            className="link-button facebook-button"
                        >
                            <i className="fab fa-facebook-square"></i>
                            Log in with Facebook
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <button
                            onClick={handleForgotPassword}
                            className="link-button"
                        >
                            Forgot password?
                        </button>
                    </div>

                </div>

                {/* Signup Box */}
                <div className="signup-box">
                    <p>
                        Don't have an account?{' '}

                        <button
                            onClick={handleSignup}
                            className="link-button signup-link-button"
                        >
                            Sign up
                        </button>
                    </p>
                </div>

                {/* App Store Buttons */}
                <div className="app-buttons">

                    <p>Get the app.</p>

                    <div className="store-buttons">

                        <button
                            onClick={handleAppStore}
                            className="app-store store-button"
                        >
                            <i className="fab fa-apple"></i>
                            App Store
                        </button>

                        <button
                            onClick={handleGooglePlay}
                            className="google-play store-button"
                        >
                            <i className="fab fa-google-play"></i>
                            Google Play
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;