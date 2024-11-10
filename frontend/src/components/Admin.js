import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [events, setEvents] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedDocumentName, setSelectedDocumentName] = useState(null); // Store the document name
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const navigate = useNavigate();

    // Fetch events from the backend API when 'Events' is selected
    useEffect(() => {
        if (activeComponent === 'Events') {
            const fetchEvents = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/events'); // Adjust the URL based on your backend
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            };

            fetchEvents();
        }
    }, [activeComponent]);

    const handleLogout = () => {
        localStorage.removeItem('user');  // Clear session
        navigate('/login');
    };

    const handleEdit = (id) => {
        console.log('Edit event with ID:', id);
        // Implement your logic for editing an event
    };

    const handleConfirm = (id) => {
        console.log('Confirm event with ID:', id);
        // Implement your logic for confirming an event
    };

    const handleDelete = (id) => {
        console.log('Delete event with ID:', id);
        // Implement your logic for deleting an event
    };

    const handleViewDocument = (documentName) => {
        // Construct the URL for the document in the 'uploads' folder
        const fullDocumentUrl = `http://localhost:5000/uploads/${documentName}`;
    
        // Log the URL for debugging
        console.log("Document URL:", fullDocumentUrl);
    
        // Set the document and show modal
        setSelectedDocument(fullDocumentUrl);
        setSelectedDocumentName(documentName);
        setShowDocumentModal(true);
    };
    
    
    const handleCloseDocumentModal = () => {
        setShowDocumentModal(false);
        setSelectedDocument(null);
        setSelectedDocumentName(null); // Reset the document name when closing
    };

    const handleViewImage = (imageName) => {
        // Construct the URL for the image in the 'uploads' folder
        const fullImageUrl = `http://localhost:5000/uploads/${imageName}`;
        
        // Log the URL for debugging
        console.log("Image URL:", fullImageUrl);
        
        // Set the image and show modal
        setSelectedDocument(fullImageUrl); // Reusing the same state for simplicity
        setSelectedDocumentName(imageName); // Reusing the same state for image name
        setShowDocumentModal(true);
    };
    

    // Function to render the selected content in the main content area
    const renderContent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Events':
                return (
                    <div style={styles.sectionBox}>
                        <h2>Events</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Organization</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                    <th>Documents</th>
                                    <th>Photo</th>
                                    <th>Venue</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.length > 0 ? (
                                    events.map((event) => (
                                        <tr key={event.id}>
                                            <td>{event.name}</td>
                                            <td>{event.organization}</td>
                                            <td>{event.date}</td>
                                            <td>{event.duration}</td>
                                            <td>
                                                {event.documents && (
                                                    <button onClick={() => handleViewDocument(event.documents, event.name)}>
                                                        View
                                                    </button>
                                                )}
                                                 {event.photo && (
        <button onClick={() => handleViewImage(event.photo)}>
            View Image
        </button>
    )}
                                                
                                            </td>
                                            <td>{event.photo}</td>
                                            <td>{event.venue}</td>
                                            <td>
                                                <button onClick={() => handleEdit(event.id)}>Edit</button>
                                                <button onClick={() => handleConfirm(event.id)}>✔</button>
                                                <button onClick={() => handleDelete(event.id)}>❌</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No events available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Councils':
                return <div style={styles.sectionBox}>This is the Councils and Organizations section</div>;
            case 'Users':
                return <div style={styles.sectionBox}>This is the Users section</div>;
            case 'Reports':
                return <div style={styles.sectionBox}>This is the Reports section</div>;
            default:
                return <div style={styles.sectionBox}>This is the Dashboard section</div>;
        }
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <h1 style={styles.navTitle}>Admin Panel</h1>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Sidebar and main content */}
            <div style={styles.main}>
                {/* Sidebar */}
                <aside style={styles.sidebar}>
                    <ul style={styles.sidebarList}>
                        <li
                            style={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Dashboard' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Dashboard')}
                        >
                            Dashboard
                        </li>
                        <li
                            style={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Events' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Events')}
                        >
                            Events
                        </li>
                        <li
                            style={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Councils' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Councils')}
                        >
                            Councils and Organizations
                        </li>
                        <li
                            style={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Users' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Users')}
                        >
                            Users
                        </li>
                        <li
                            style={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Reports' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Reports')}
                        >
                            Reports
                        </li>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main style={styles.content}>
                    {renderContent()}
                </main>
            </div>

            {/* Document Modal */}
            {showDocumentModal && (
    <div style={styles.modalBackdrop} onClick={handleCloseDocumentModal}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedDocumentName}</h3> {/* Display the document name */}
            
            {selectedDocumentName?.endsWith('.pdf') ? (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={selectedDocument} />
                </Worker>
            ) : (
                <img src={selectedDocument} alt={selectedDocumentName} style={{ width: '100%', height: 'auto' }} />
            )}

            <button style={styles.closeButton} onClick={handleCloseDocumentModal}>
                Close
            </button>
        </div>
    </div>
)}

        </div>
    );
};

// Inline styles for the layout
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0e4296',
        color: '#fff',
    },
    navTitle: {
        fontSize: '1.5rem',
    },
    logoutButton: {
        backgroundColor: '#fff',
        color: '#0e4296',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    main: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#8ba4cc',
        padding: '20px 0',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
    },
    sidebarItem: {
        padding: '10px 20px',
        cursor: 'pointer',
        color: '#063970',
        transition: 'background-color 0.3s, color 0.3s',
    },
    activeSidebarItem: {
        backgroundColor: '#063970',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f4f4f4',
    },
    sectionBox: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '90vh',  // Add max height
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',  // Allow scrolling if content is too tall
    },
    closeButton: {
        backgroundColor: '#0e4296',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px',
    },
};

export default Admin;


