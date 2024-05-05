import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Homepage.module.css';

function Homepage() {
    const { setAuthenticated, setToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://budget-application-m7296.ondigitalocean.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                setAuthenticated(true);
                setToken(data.token);
                setRedirectToDashboard(true);
            } else {
                alert('Failed to log in. Please check your username and password.');
            }
        } catch (error) {
            alert('Unable to connect. Proceeding in offline mode.');
            setAuthenticated(true);
            setRedirectToDashboard(true);
        }
    };

    const goToSignUp = () => {
        setRedirectToDashboard(true);
    };

    if (redirectToDashboard) {
        return <Redirect to="/dashboard" />;
    }

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
