import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Instagram</h1>

            <h2>Welcome to Instagram!</h2>

            <p>You have successfully logged in.</p>

            <button>
                Log out
            </button>
        </div>
    );
};

export default Home;