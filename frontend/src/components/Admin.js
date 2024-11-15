import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Admin = () => {

    const [showAddCouncilForm, setShowAddCouncilForm] = useState(false); // State to toggle Add Council form visibility
    const [councilFormData, setCouncilFormData] = useState({
        organization: '',
        adviser: '',
        president: '',
        vicePresident: '',
        secretary: '',
        treasurer: '',
        auditor: '',
        pro: '',
        rep: '',
        representative: ''
    });

    const handleAddCouncil = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/councils', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(councilFormData), // Sending form data as JSON
              });
              
    
          const data = await response.json();
          if (response.ok) {
            alert('Council data saved successfully!');
          } else {
            alert('Error saving council data: ' + data.message);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Error submitting form');
        }
      };

      
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [events, setEvents] = useState([]);
    const [councils, setCouncils] = useState([]);
    const [users, setUsers] = useState([]);
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


    

    // Fetch councils from the backend API when 'councils' is selected
    useEffect(() => {
        const fetchCouncils = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/councils');
                const data = await response.json();
    
                if (response.ok) {
                    setCouncils(data); // Set councils state with fetched data
                } else {
                    console.error('Failed to fetch councils:', data.message);
                }
            } catch (error) {
                console.error('Error fetching councils:', error);
            }
        };
    
        if (activeComponent === 'Councils') {
            fetchCouncils();
        }
    }, [activeComponent]);

    // Fetch users from the backend API when 'users' is selected
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
    
                if (response.ok) {
                    setUsers(data); // Set Users state with fetched data
                } else {
                    console.error('Failed to fetch users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        if (activeComponent === 'Users') {
            fetchUsers();
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

    const handleButtonHover = (event, isHovering) => {
        if (isHovering) {
            event.target.style.backgroundColor = '#034d8c'; // Darker shade on hover
        } else {
            event.target.style.backgroundColor = '#0e4296'; // Original color
        }
    };
    

    // Function to render the selected content in the main content area
    const renderContent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Events':
                return (
                    <div >
                        <h2>Events</h2>
                        <div style={styles.addEventButtonContainer}>
                            <button style={styles.addEventButton} onClick={() => console.log('Add New Event')}>
                                Add New Event
                            </button>
                        </div>
                        <table style={styles.table}>
    <thead>
        <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Organization</th>
            <th style={styles.tableCell}>Date</th>
            <th style={styles.tableCell}>Duration</th>
            <th style={styles.tableCell}>Documents</th>
            <th style={styles.tableCell}>Photo</th>
            <th style={styles.tableCell}>Venue</th>
            <th style={styles.tableCell}>Actions</th>
        </tr>
    </thead>
    <tbody>
        {events.length > 0 ? (
            events.map((event) => (
                <tr key={event.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{event.name}</td>
                    <td style={styles.tableCell}>{event.organization}</td>
                    <td style={styles.tableCell}>{event.date}</td>
                    <td style={styles.tableCell}>{event.duration}</td>
                    <td style={styles.tableCell}>
                        {event.documents && (
                            <button
                                style={styles.button}
                                onClick={() => handleViewDocument(event.documents, event.name)}
                                onMouseEnter={(e) => handleButtonHover(e, true)}
                                onMouseLeave={(e) => handleButtonHover(e, false)}
                            >
                                View Document
                            </button>
                        )}
                    </td>
                    <td style={styles.tableCell}>
                        {event.photo && (
                            <button
                                style={styles.button}
                                onClick={() => handleViewImage(event.photo)}
                                onMouseEnter={(e) => handleButtonHover(e, true)}
                                onMouseLeave={(e) => handleButtonHover(e, false)}
                            >
                                View Image
                            </button>
                        )}
                    </td>
                    <td style={styles.tableCell}>{event.venue}</td>
                    <td style={styles.tableCell}>
                        <button
                            style={styles.button}
                            onClick={() => handleEdit(event.id)}
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                        >
                            Edit
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => handleConfirm(event.id)}
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                        >
                            ✔
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => handleDelete(event.id)}
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                        >
                            ❌
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" style={styles.noEvents}>No events available</td>
            </tr>
        )}
    </tbody>
</table>

                    </div>
                );
                case 'Councils':
                    return (
                        <div >
                            <h2 >Councils and Organizations</h2>
                            <div style={styles.addCouncilButtonContainer}>
                                <button style={styles.addCouncilButton} onClick={() => setShowAddCouncilForm(true)}>
                                    Add New Council
                                </button>
                            </div>
                            <div style={styles.sectionBox}>
                            <table style={styles.table}>
    <thead>
        <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Organization</th>
            <th style={styles.tableCell}>Adviser</th>
            <th style={styles.tableCell}>President</th>
            <th style={styles.tableCell}>Vise-President</th>
            <th style={styles.tableCell}>Secretary</th>
            <th style={styles.tableCell}>Treasurer</th>
            <th style={styles.tableCell}>Auditor</th>
            <th style={styles.tableCell}>P.R.O</th>
            <th style={styles.tableCell}>Representative</th>
            
        </tr>
    </thead>
    <tbody>
        {councils.length > 0 ? (
            councils.map((councils) => (
                <tr key={councils.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{councils.organization}</td>
                    <td style={styles.tableCell}>{councils.adviser}</td>
                    <td style={styles.tableCell}>{councils.president}</td>
                    <td style={styles.tableCell}>{councils.vicePresident}</td>
                    <td style={styles.tableCell}> {councils.secretary}
                     
                    </td>
                    <td style={styles.tableCell}>{councils.treasurer}
                       
                    </td>
                    <td style={styles.tableCell}>{councils.auditor}</td>
                    <td style={styles.tableCell}>{councils.pro}
                       
                    </td>
                    <td style={styles.tableCell}>{councils.rep} {councils.representative}</td>

                    
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" style={styles.noEvents}>No council available</td>
            </tr>
        )}
    </tbody>   
</table>
                            </div>
                            {showAddCouncilForm && (
                                <form onSubmit={handleAddCouncil} style={styles.sectionBox}>
                                    <div style={styles.formGroup}>
                                        <label>Organization/Council:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.organization}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, organization: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Adviser:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.adviser}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, adviser: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>President:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.president}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, president: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Vice-President:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.vicePresident}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, vicePresident: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Secretary:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.secretary}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, secretary: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Treasurer:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.treasurer}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, treasurer: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Auditor:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.auditor}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, auditor: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>P.R.O:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.pro}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, pro: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Rep:</label>
                                        <select
                                            value={councilFormData.rep}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, rep: e.target.value })}
                                            style={styles.input}
                                        >
                                            <option value="">Select Representative</option>
                                            <option value="Rep1">Rep 1</option>
                                            <option value="Rep2">Rep 2</option>
                                        </select>
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label>Representative:</label>
                                        <input
                                            type="text"
                                            value={councilFormData.representative}
                                            onChange={(e) => setCouncilFormData({ ...councilFormData, representative: e.target.value })}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formButtons}>
                                        <button type="submit" style={styles.submitButton}>Submit</button>
                                        <button type="button" onClick={() => setShowAddCouncilForm(false)} style={styles.cancelButton}>Cancel</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    );
            case 'Users':
                return (
                    <div >
                        <h2 >Users</h2>
                       
                        <div style={styles.sectionBox}>
                        <table style={styles.table}>

<table style={styles.table}>
    <thead>
        <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Organization</th>
            <th style={styles.tableCell}>Username</th>
            <th style={styles.tableCell}>Password</th>
            <th style={styles.tableCell}>Email</th>
            
            
        </tr>
    </thead>
    <tbody>
        {users.length > 0 ? (
            users.map((users) => (
                <tr key={users.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{users.organization}a</td>
                    <td style={styles.tableCell}>{users.adviser}a</td>
                    <td style={styles.tableCell}>{users.president}a</td>
                    <td style={styles.tableCell}>{users.vicePresident}a</td>
                    <td style={styles.tableCell}> {users.secretary}a</td>
                     
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" style={styles.noEvents}>No council available</td>
            </tr>
        )}
    </tbody>   
</table>
</table>
                        </div>
                      
                    </div>
                );
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
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: '#0e4296',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#f4f4f9',
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#0e4296',
        color: '#fff',
        padding: '20px',
    },
    sidebarList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    sidebarItem: {
        padding: '10px 20px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    activeSidebarItem: {
        backgroundColor: '#8ba4cc',
    },
    content: {
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Add subtle shadow around the table
    },
    tableHeader: {
        backgroundColor: '#0e4296', // Solid blue header color
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '10px',
    },
    tableRow: {
        '&:nth-child(even)': {
            backgroundColor: '#e3f2fd', // Light blue for even rows
        },
        '&:nth-child(odd)': {
            backgroundColor: '#bbdefb', // Slightly darker blue for odd rows
        },
    },
    tableCell: {
        padding: '12px 15px', // Add padding for spacing
        border: '1px solid #ddd', // Light border for separation
        textAlign: 'left',
        fontSize: '14px',
    },
    button: {
        backgroundColor: '#0e4296',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '2px 5px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#034d8c', // Darker blue when button is hovered
    },
    noEvents: {
        textAlign: 'center',
        color: '#888',
        padding: '20px',
    },

    
    sectionBox: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    addEventButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '20px',
    },
    addEventButton: {
        padding: '10px 20px',
        backgroundColor: '#0e4296',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '1rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    actionButton: {
        padding: '10px 20px',
        backgroundColor: '#0e4296',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '1rem',
    },
    modalBackdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better focus
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it appears above other content
        padding: '20px', // Add padding for responsiveness
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '80%%',
        maxHeight: '80%',
        overflowY: 'auto',
    },
    closeButton: {
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px',
    },
};

export default Admin;
