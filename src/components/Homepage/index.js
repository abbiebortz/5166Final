import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Homepage.module.css';

function Homepage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            navigate('/dashboard'); // Navigate to dashboard
        } catch (error) {
            console.error('Login Error:', error);
            alert('Failed to log in. Please try again.');
        }
    };

    const goToSignUp = () => {
        navigate('/signup'); // Navigate to sign up page
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Log In</button>
                </form>
                <button onClick={goToSignUp} className={styles.switchButton}>Need an account? Sign up.</button>
            </div>
        </div>
    );
}

export default Homepage;
