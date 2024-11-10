import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>ADMIN LOGIN</h2>
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
                        <button type="button" style={styles.button} onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                </form>
                <p style={styles.forgotPassword}>Forgot Password?</p>
            </div>
            <button style={styles.backButton} onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

// Sidebar styles with hover effect
const sidebarStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
        backgroundColor: '#f8f8f8',
        padding: '10px',
        borderRadius: '5px',
    },
    item: {
        padding: '10px',
        margin: '5px 0',
        textAlign: 'left',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    itemHovered: {
        backgroundColor: '#063970',
        color: '#fff',
    },
    itemSelected: {
        backgroundColor: '#1b4b87', // For when an item is selected
        color: '#fff',
    },
    active: {
        backgroundColor: '#063970',
        color: '#fff',
    },
};

// Inline styles (same as your Login.js)
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    title: {
        marginBottom: '20px',
        color: '#063970',
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
        width: '250px',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '10px',
    },
    button: {
        flex: 1,
        padding: '8px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#063970',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    forgotPassword: {
        marginTop: '10px',
        color: '#063970',
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
        color: 'red',
        marginTop: '10px',
    },
};

export default AdminLogin;
