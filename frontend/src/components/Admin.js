import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import styles from './Admin.module.css';
import Addcouncils from './Addcouncils';
const Admin = () => {

    const [showAddCouncilForm, setShowAddCouncilForm] = useState(false); // State to toggle Add Council form visibility
 

  

      
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

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')  // Update URL to point to the correct port
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);
    

    // para sa delete button
    const handleDelete = async (eventId) => {
        console.log('Attempting to delete event with ID:', eventId);
        
        const confirmed = window.confirm('Are you sure you want to delete this event?');
        if (!confirmed) return;
    
        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const responseBody = await response.json();  // Get the response body
            console.log('Response body:', responseBody);  // Log the response body
    
            if (response.ok) {
                console.log('Delete response:', responseBody);
                alert('Event deleted successfully');
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            } else {
                console.error('Delete failed:', responseBody);
                alert(`Failed to delete event: ${responseBody.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event');
        }
    };
    
    
    
      
    
    
    
// para sa approve button
const handleConfirm = async (eventId) => {
    console.log('Attempting to approve event with ID:', eventId);

    const confirmed = window.confirm('Are you sure you want to approve this event?');
    if (!confirmed) return;

    try {
        const response = await fetch(`http://localhost:5000/api/events/approve/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseBody = await response.json(); // Get the response body
        console.log('Response body:', responseBody); // Log the response body

        if (response.ok) {
            console.log('Approve response:', responseBody);
            alert('Event approved successfully!');
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } else {
            console.error('Approval failed:', responseBody);
            alert(`Failed to approve event: ${responseBody.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error approving event:', error);
        alert('Error approving event');
    }
};





    
    
    
    
    
    
    
    

    

    const handleLogout = () => {
        localStorage.removeItem('user');  // Clear session
        navigate('/login');
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
                        <div className={styles.addEventButtonContainer}>
                            
                        </div>
                        <table className={styles.table}>
    <thead>
        <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>Name</th>
            <th className={styles.tableCell}>Organization</th>
            <th className={styles.tableCell}>Date</th>
            <th className={styles.tableCell}>Duration</th>
            <th className={styles.tableCell}>Documents</th>
            <th className={styles.tableCell}>Photo</th>
            <th className={styles.tableCell}>Venue</th>
            <th className={styles.tableCell}>Actions</th>
        </tr>
    </thead>
    <tbody>
        {events.length > 0 ? (
            events.map((event) => (
                
                <tr key={event.id} className={styles.tableRow}>
    <td className={styles.tableCell}>{event.name}</td>
    <td className={styles.tableCell}>{event.organization}</td>
    <td className={styles.tableCell}>{event.date}</td>
    <td className={styles.tableCell}>{event.duration}</td>
    
    <td className={styles.tableCell}>
        {event.documents && (
            <button
                className={styles.button}
                onClick={() => handleViewDocument(event.documents, event.name)}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
            >
                View Document
            </button>
        )}
    </td>
    <td className={styles.tableCell}>
        {event.photo && (
            <button
                className={styles.button}
                onClick={() => handleViewImage(event.photo)}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
            >
                View Image
            </button>
        )}
    </td>
    <td className={styles.tableCell}>{event.venue}</td>
    <td className={styles.tableCell}>
    <button
    className={styles.button}
    onClick={() => {
        console.log('Approve button clicked for event ID:', event.id); // Log the event ID
        handleConfirm(event.id); // Pass event.id to the approve function
    }}
>
    ✔
</button>

        <button
    className={styles.button}
    onClick={() => {
        console.log('Delete button clicked for event ID:', event.id);  // Log the event ID
        handleDelete(event.id);  // Pass event.id to the delete function
    }}
>
    ❌
</button>



    </td>
</tr>

            ))
        ) : (
            <tr>
                <td colSpan="8" className={styles.noEvents}>No events available</td>
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
                            <div className={styles.addCouncilButtonContainer}>
                                <button className={styles.addCouncilButton} onClick={() => setShowAddCouncilForm(true)}>
                                    Add New Council
                                </button>
                            </div>
                            <div className={styles.sectionBox}>
                            <table className={styles.table}>
    <thead>
        <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>Organization</th>
            <th className={styles.tableCell}>Adviser</th>
            <th className={styles.tableCell}>President</th>
            <th className={styles.tableCell}>Vise-President</th>
            <th className={styles.tableCell}>Secretary</th>
            <th className={styles.tableCell}>Treasurer</th>
            <th className={styles.tableCell}>Auditor</th>
            <th className={styles.tableCell}>P.R.O</th>
            <th className={styles.tableCell}>Representative</th>
            
        </tr>
    </thead>
    <tbody>
        {councils.length > 0 ? (
            councils.map((councils) => (
                <tr key={councils.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{councils.organization}</td>
                    <td className={styles.tableCell}>{councils.adviser}</td>
                    <td className={styles.tableCell}>{councils.president}</td>
                    <td className={styles.tableCell}>{councils.vicePresident}</td>
                    <td className={styles.tableCell}> {councils.secretary}
                     
                    </td>
                    <td className={styles.tableCell}>{councils.treasurer}
                       
                    </td>
                    <td className={styles.tableCell}>{councils.auditor}</td>
                    <td className={styles.tableCell}>{councils.pro}
                       
                    </td>
                    <td className={styles.tableCell}>{councils.rep} {councils.representative}</td>

                    
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" className={styles.noEvents}>No council available</td>
            </tr>
        )}
    </tbody>   
</table>
                            </div>


                            <div>
      <button onClick={() => setShowAddCouncilForm(true)}>Add Council</button>

      {/* Render the AddCouncils component */}
      <Addcouncils
        showAddCouncilForm={showAddCouncilForm}
        setShowAddCouncilForm={setShowAddCouncilForm}
      />
    </div>

                               {/* Render the AddCouncils component */}

                           
                        </div>
                    );
            case 'Users':
                return (
                    <div >
                        <h2 >Users</h2>
                       
                        <div className={styles.sectionBox}>
                        <table className={styles.table}>

<table className={styles.table}>
    <thead>
        <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>Name</th>
            <th className={styles.tableCell}>Organization</th>
            <th className={styles.tableCell}>Username</th>
            <th className={styles.tableCell}>Password</th>
            <th className={styles.tableCell}>Email</th>
            
            
        </tr>
    </thead>
    <tbody>
        {users.length > 0 ? (
            users.map((users) => (
                <tr key={users.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{users.organization}a</td>
                    <td className={styles.tableCell}>{users.adviser}a</td>
                    <td className={styles.tableCell}>{users.president}a</td>
                    <td className={styles.tableCell}>{users.vicePresident}a</td>
                    <td className={styles.tableCell}> {users.secretary}a</td>
                     
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" className={styles.noEvents}>No council available</td>
            </tr>
        )}
    </tbody>   
</table>
</table>
                        </div>
                      
                    </div>
                );
            case 'Reports':
                return <div className={styles.sectionBox}>This is the Reports section</div>;
            default:
                return <div className={styles.sectionBox}>This is the Dashboard section</div>;
        }
    };

   

    return (

        
        <div className={styles.container}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <h1 className={styles.navTitle}>Admin Panel</h1>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Sidebar and main content */}
            <div className={styles.main}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <ul className={styles.sidebarList}>
                        <li
                            className={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Dashboard' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Dashboard')}
                        >
                            Dashboard
                        </li>
                        <li
                            className={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Events' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Events')}
                        >
                            Events
                        </li>
                        <li
                            className={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Councils' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Councils')}
                        >
                            Councils and Organizations
                        </li>
                        <li
                            className={{
                                ...styles.sidebarItem,
                                ...(activeComponent === 'Users' && styles.activeSidebarItem),
                            }}
                            onClick={() => setActiveComponent('Users')}
                        >
                            Users
                        </li>
                        <li
                            className={{
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
                <main className={styles.content}>
                    {renderContent()}
                </main>
            </div>

            {/* Document Modal */}
            {showDocumentModal && (
                <div className={styles.modalBackdrop} onClick={handleCloseDocumentModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedDocumentName}</h3> {/* Display the document name */}
                        
                        {selectedDocumentName?.endsWith('.pdf') ? (
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={selectedDocument} />
                            </Worker>
                        ) : (
                            <img src={selectedDocument} alt={selectedDocumentName} className={{ width: '100%', height: 'auto' }} />
                        )}

                        <button className={styles.closeButton} onClick={handleCloseDocumentModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
