import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            // Simulating successful sign-up
            // Replace this with your actual sign-up logic
            alert('Account created successfully. Please log in.');
            navigate('/'); // Navigate to login page
        } catch (error) {
            console.error('Sign Up Error:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp} className={styles.signupForm}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.signupInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.signupInput}
                />
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
            <p className={styles.loginLinkText}>
                Already have an account? <a href="/" className={styles.loginLink}>Log in here.</a>
            </p>
        </div>
    );
}

export default SignUp;
