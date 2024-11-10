// src/components/PublicPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PHImage from '../assets/PH.JPG';
import SteestImage from '../assets/steest.PNG';
import SttImage from '../assets/stt.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Building2} from 'lucide-react';

const PublicPage = () => {

    const [selectedSidebar, setSelectedSidebar] = useState('New Booking');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility 
    const [newSidebarSelection, setNewSidebarSelection] = useState('Dashboard Overview'); // New sidebar state
    const navigate = useNavigate();
    
  

    const images = [SteestImage, SttImage];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        const timeout = setTimeout(nextSlide, 5000);
        return () => clearTimeout(timeout);
    }, [nextSlide]);

    const handleLoginClick = () => {
        navigate('/login');
    };
    const renderSidebarContent = () => {
        switch (selectedSidebar) {
            case 'New Booking':
                return <p>Form to create a new booking.</p>;
            case 'Scheduled Bookings':
                return <p>List of scheduled bookings.</p>;
            case 'Available Dates':
                return <p>Calendar with available dates for booking.</p>;
            case 'Events':
                return (
                    <div>
                        <p>Upcoming events information.</p>
                        <button style={styles.addEventButton} onClick={() => setModalOpen(true)}>
                            Add Event
                        </button>
                    </div>
                );
            case 'Report':
                return <p>Report generation and analysis.</p>;
            default:
                return null;
        }
    };
    const renderNewSidebarContent = () => {
        switch (newSidebarSelection) {
            case 'University Supreme Student Government':
                return <p>Dashboard overview and user summary.</p>;
            case 'COE Council':
                return <p>User settings and preferences.</p>;
            case 'Notifications':
                return <p>List of notifications for the user.</p>;
            default:
                return null;
        }
    };

    return (
        <div >
            {/* Navbar */}
            <nav style={styles.navbar}>
                <img src={PHImage} alt="Logo" style={styles.logo} />
                <button onClick={handleLoginClick} style={styles.loginButton}>Login</button>
            </nav>
<div style={styles.container}>
            {/* Main Content */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                {/* Slideshow on the Left */}
                <div style={styles.slideshow}>
                    <h2>Event Slideshow</h2>
                    <div style={styles.slideshowContainer}>
                        <button onClick={nextSlide} style={styles.navButton}>❮</button>
                        <img src={images[currentSlide]} alt="Slideshow" style={styles.slideshowImage} />
                        <button onClick={nextSlide} style={styles.navButton}>❯</button>
                    </div>
                </div>

                {/* Calendar on the Right */}
                <div style={styles.calendarContainer}>
                    <h2>Select a Date for an Event</h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        minDate={new Date(2020, 0, 1)}
                    />
                    <p style={{ marginTop: '20px' }}>Selected Date: {date.toDateString()}</p>
                </div>
            </div>

            {/* First Divider */}
            <hr style={styles.divider} />

            
            <hr style={styles.divider} />

            <div style={styles.newSidebarContainer}>
    <h2 style={styles.header}> <Building2 size={20} color="#063970" /> Councils and Organization List</h2>
    <div style={styles.sidebarContainer}>
        <div style={styles.sidebar}>
            {['University Supreme Student Government','COE Council','COBA Council','CHI Council','COENG Council','BEED Society','Litera Organization','Radicals Organization','Kapulungan Filipino','Social Studies Organization (UNESCO)','Association of Stenographer Aiming for Progress (ASAP)','Association of Junior Administrator (AJA)','Tourism Society (TM Soc)','Hospitality Society (HM Soc)','Bartender’s Society (BAR Soc)	Jessica Faraon	Prof. Mylene T Balagot','Association of Civil Engineering Students (ACES)','Association of Concerned Computer Engineering Students (ACCESS) ','URSAC Extension Organization','URSAC Fierce Group Facilitator ','Environment Army Society','Hiyas ng Rizal Dance Troupe','Red Cross Youth Council','Tanghal Tipolo','CORO URSAC','Christian Brotherhood International','Elevate URSAC Chapter'].map((item) => (
                <button
                    key={item}
                    onClick={() => setNewSidebarSelection(item)}
                    style={{
                        ...styles.sidebarButton,
                        backgroundColor: newSidebarSelection === item ? '#0e4296' : 'transparent',
                        color: newSidebarSelection === item ? '#fff' : '#0e4296',
                    }}
                >
                    {item}
                </button>
            ))}
        </div>
        <div style={styles.sidebarContent}>
            <h3>{newSidebarSelection}</h3>
            {renderNewSidebarContent()}
        </div>
    </div>
    <hr style={styles.divider} />
    <div style={styles.VMC}>
    <div style={styles.verticalLine}>
                        <h3 style={styles.header}>VISION</h3>
                        <p>The leading University in human resource development, knowledge and technology generation, and environmental stewardship.</p>
                        <h3 style={styles.header}>MISSION</h3>
                        <p>The University of Rizal System is committed to nurturing and producing upright and competent graduates and an empowered community through relevant and sustainable higher professional and technical instruction, research, extension, and production services.</p>
                        <h3 style={styles.header}>CORE VALUES</h3>
                        <p>R – Responsiveness</p>
                        <p>I – Integrity</p>
                        <p>S – Service</p>
                        <p>E – Excellence</p>
                        <p>S – Social Responsibility</p>
                    </div>
                    </div>
</div>

            {/* Merged VISION, MISSION, and Section 1 with News and Information */}
            <div style={styles.mergedSection}>
                <div style={styles.leftSection}>
                    
                    <div style={styles.sectionWithLine}>
                        <h3 style={styles.header}>VISION</h3>
                        <p>The leading University in human resource development, knowledge and technology generation, and environmental stewardship.</p>
                        <h3 style={styles.header}>MISSION</h3>
                        <p>The University of Rizal System is committed to nurturing and producing upright and competent graduates and an empowered community through relevant and sustainable higher professional and technical instruction, research, extension, and production services.</p>
                        <h3 style={styles.header}>CORE VALUES</h3>
                        <p>R – Responsiveness</p>
                        <p>I – Integrity</p>
                        <p>S – Service</p>
                        <p>E – Excellence</p>
                        <p>S – Social Responsibility</p>
                    </div>
                </div>

                
            </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Your School Name. All rights reserved.</p>
            </footer>

            {/* Third Divider - Optional */}
            <hr style={styles.divider} />
        </div>
    );
};

// OfficerItem component to handle each officer's image and title
const OfficerItem = ({ image, title }) => (
    <div style={styles.officerItem}>
        <img src={image} alt={title} style={styles.officerImage} />
        <p>{title}:</p>
    </div>
);

// Inline styles for the navbar, slideshow, calendar, and new sections
const styles = {

    sidebarContent: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },

    sidebarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    sidebarButton: {
        padding: '10px',
        border: '1px solid #0e4296',
        marginBottom: '5px',
        cursor: 'pointer',
        textAlign: 'left',
        backgroundColor: 'transparent',
        fontSize: '16px',
        color: '#0e4296',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        width: '200px',
        maxHeight: '500px', 
        overflowY: 'scroll', 
        paddingRight: '5px',
    },
    newSidebarContainer: {
        marginTop: '20px',
        maxWidth: '1200px',
        width: '100%',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#063970',
        color: '#fff',
    },
    logo: {
        width: '40px',
        height: '40px',
    },
    loginButton: {
        backgroundColor: 'transparent',
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '10px',
        fontSize: '16px',
        padding: '5px 15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    slideshow: {
        flex: 1,
        marginRight: '20px',
        textAlign: 'center',
    },
    slideshowContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#0e4296',
        padding: '0 10px',
    },
    slideshowImage: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        borderRadius: '8px',
    },
    calendarContainer: {
        flex: 1,
        textAlign: 'center',
    },
    divider: {
        margin: '20px 0',
        border: 'none',
        borderTop: '2px solid black',
    },
    mergedSection: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
    leftSection: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    sectionWithLine: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
    },
    officerItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0',
    },
    officerImage: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    infoFrame: {
        flex: 1,
        padding: '20px',
        marginLeft: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
    },
    header: {
        color: '#154c79',
    },
    footer: {
        textAlign: 'center',
        padding: '10px 0',
        backgroundColor: '#063970',
        color: '#fff',
        borderTop: '1px solid #ccc',
    },
};

export default PublicPage;
