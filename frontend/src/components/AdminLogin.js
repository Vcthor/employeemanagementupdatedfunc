import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request with username and password for admin login
            const response = await axios.post('http://localhost:5000/adminlogin', {
                username,
                password,
            });

            if (response.data.success) {
                // If login is successful, redirect to the admin dashboard
                navigate('/admin');
            } else {
                // Display an error message if login failed
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    // Function to handle Sign Up button click
    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the Signup page
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>ADMIN LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>Login</button>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
                <p className={styles.forgotPassword}>Forgot Password?</p>
            </div>
            <button className={styles.backButton} onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default AdminLogin;
