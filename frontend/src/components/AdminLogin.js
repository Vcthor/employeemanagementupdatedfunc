import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminLogin.module.css';
import logo from '../assets/urslogo.png'
import back from '../assets/close-outline.svg'

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
                <img className={styles.backButton} src={back} onClick={() => navigate('/')}/>
                <img src={logo} className={styles.logo}/>
                <h2 className={styles.title}>Welcome Admin</h2>
                <p className={styles.subtext}>Please enter your details to sign in</p>
                <form onSubmit={handleLogin} className={styles.form}>
                    <p className={styles.label}>Your Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <p className={styles.label}>Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className={styles.forgot}>Forgot Password?</p>
                    <button type="submit" className={styles.button}>Login</button>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
                <div className={styles.adminCont}>
                    <p className={styles.ask}>Not an admin?</p>
                    <p
                        className={styles.admin}
                        onClick={() => navigate('/login')} // Navigate to Login
                    >
                        Click Here
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
