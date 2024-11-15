import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import axios from 'axios'; // Import Axios

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the user login endpoint
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });

            if (response.data.success) {
                // If login is successful, redirect to Dashboard
                navigate('/dashboard');
            } else {
                // Display an error message if login failed
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button}>Login</button>
                        <button
                            type="button"
                            style={styles.button}
                            onClick={() => navigate('/adminlogin')} // Navigate to AdminLogin
                        >
                            Admin Login
                        </button>
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                </form>
                <p style={styles.forgotPassword}>Forgot Password?</p>
            </div>
            <button style={styles.backButton} onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f5f5f5', // Optional background color
    },
    title: {
        marginBottom: '20px',
        color: '#063970', // Optional title color
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    input: {
        width: '250px', // Adjust width as needed
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between', // Align buttons horizontally
        width: '100%', // Full width for button alignment
        marginTop: '10px',
    },
    button: {
        flex: 1, // Allow buttons to grow equally
        padding: '8px',
        margin: '0 5px', // Margin between buttons
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#063970', // Button color
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    forgotPassword: {
        marginTop: '10px',
        color: '#063970', // Optional color for "Forgot Password?"
        cursor: 'pointer',
    },
    backButton: {
        marginTop: '10px',
        backgroundColor: 'transparent',
        border: '1px solid #063970',
        color: '#063970',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    error: {
        color: 'red', // Style for error messages
        marginTop: '10px',
    },
};

export default Login;
