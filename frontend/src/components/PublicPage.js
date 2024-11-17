// src/components/PublicPage.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PHImage from "../assets/PH.JPG";
import SteestImage from "../assets/steest.PNG";
import SttImage from "../assets/stt.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Building2 } from "lucide-react";
import styles from "./PublicPage.module.css";
import logo from "../assets/urslogo.png";
import login from "../assets/log-in.svg";
import coeng from '../assets/coeng.jpg';

const PublicPage = () => {
  const [selectedSidebar, setSelectedSidebar] = useState("New Booking");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [newSidebarSelection, setNewSidebarSelection] =
    useState("Dashboard Overview"); // New sidebar state
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
    navigate("/login");
  };
  const renderSidebarContent = () => {
    switch (selectedSidebar) {
      case "New Booking":
        return <p>Form to create a new booking.</p>;
      case "Scheduled Bookings":
        return <p>List of scheduled bookings.</p>;
      case "Available Dates":
        return <p>Calendar with available dates for booking.</p>;
      case "Events":
        return (
          <div>
            <p>Upcoming events information.</p>
            <button
              className={styles.addEventButton}
              onClick={() => setModalOpen(true)}
            >
              Add Event
            </button>
          </div>
        );
      case "Report":
        return <p>Report generation and analysis.</p>;
      default:
        return null;
    }
  };
  const renderNewSidebarContent = () => {
    switch (newSidebarSelection) {
      case "University Supreme Student Government":
        return <p>Dashboard overview and user summary.</p>;
      case "COE Council":
        return <p>User settings and preferences.</p>;
      case "Notifications":
        return <p>List of notifications for the user.</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div className={styles.titleflex}>
            <h1 className={styles.title}>
              University of Rizal System - Antipolo Campus
            </h1>
            <h1 className={styles.subtitle}>Event Booking System</h1>
          </div>
        </div>

        <button onClick={handleLoginClick} className={styles.loginButton}>
          <img src={login} className={styles.loginIcon} />
          Login
        </button>
      </nav>
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.firstContainer}>

          {/* Upcoming Events Section */}
          <div className={styles.upcomingEventsCard}>
            <div className={styles.upcomingEventsImageContainer}>
              <img
                src={images[currentSlide]} // Replace this with your event image array or dynamic image
                alt="Upcoming Event"
                className={styles.upcomingEventImage}
              />
              <div className={styles.gradientOverlay}>
                <h2 className={styles.upcomingEventsText}>Upcoming Events</h2>
                <p className={styles.eventDetails}>
                  <span className={styles.eventName}>CoEng Week 2024</span> || <span className={styles.eventDate}>November 11-15, 2024</span>
                </p>
              </div>
            </div>
          </div>

          {/* Calendar on the Right */}
          <div className={styles.calendarContainer}>
            <div>
                <h2 className={styles.calendarTitle}>Campus Calendar</h2>
                <Calendar
                className={styles.calendar}
                onChange={setDate}
                value={date}
                minDate={new Date(2020, 0, 1)}
                />
            </div>
            <div className={styles.eventsList}>
                <p className={{ marginTop: "24px" }}>
                <span className={styles.bold}>Selected Date:</span>{" "}
                {date.toDateString()}
                </p>
                <p className={styles.eventCheck}>
                <span className={styles.bold}>Event:</span> <span>No Event Scheduled</span>
                </p>
            </div>
          </div>
        </div>

        {/* First Divider */}
        <hr className={styles.divider} />

        <hr className={styles.divider} />

        <div className={styles.newSidebarContainer}>
          <h2 className={styles.header}>
            {" "}
            <Building2 size={20} color="#063970" /> Councils and Organization
            List
          </h2>
          <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
              {[
                "University Supreme Student Government",
                "COE Council",
                "COBA Council",
                "CHI Council",
                "COENG Council",
                "BEED Society",
                "Litera Organization",
                "Radicals Organization",
                "Kapulungan Filipino",
                "Social Studies Organization (UNESCO)",
                "Association of Stenographer Aiming for Progress (ASAP)",
                "Association of Junior Administrator (AJA)",
                "Tourism Society (TM Soc)",
                "Hospitality Society (HM Soc)",
                "Bartender’s Society (BAR Soc)	Jessica Faraon	Prof. Mylene T Balagot",
                "Association of Civil Engineering Students (ACES)",
                "Association of Concerned Computer Engineering Students (ACCESS) ",
                "URSAC Extension Organization",
                "URSAC Fierce Group Facilitator ",
                "Environment Army Society",
                "Hiyas ng Rizal Dance Troupe",
                "Red Cross Youth Council",
                "Tanghal Tipolo",
                "CORO URSAC",
                "Christian Brotherhood International",
                "Elevate URSAC Chapter",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setNewSidebarSelection(item)}
                  className={{
                    ...styles.sidebarButton,
                    backgroundColor:
                      newSidebarSelection === item ? "#0e4296" : "transparent",
                    color: newSidebarSelection === item ? "#fff" : "#0e4296",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.sidebarContent}>
              <h3>{newSidebarSelection}</h3>
              {renderNewSidebarContent()}
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.VMC}>
            <div className={styles.verticalLine}>
              <h3 className={styles.header}>VISION</h3>
              <p>
                The leading University in human resource development, knowledge
                and technology generation, and environmental stewardship.
              </p>
              <h3 className={styles.header}>MISSION</h3>
              <p>
                The University of Rizal System is committed to nurturing and
                producing upright and competent graduates and an empowered
                community through relevant and sustainable higher professional
                and technical instruction, research, extension, and production
                services.
              </p>
              <h3 className={styles.header}>CORE VALUES</h3>
              <p>R – Responsiveness</p>
              <p>I – Integrity</p>
              <p>S – Service</p>
              <p>E – Excellence</p>
              <p>S – Social Responsibility</p>
            </div>
          </div>
        </div>

        {/* Merged VISION, MISSION, and Section 1 with News and Information */}
        <div className={styles.mergedSection}>
          <div className={styles.leftSection}>
            <div className={styles.sectionWithLine}>
              <h3 className={styles.header}>VISION</h3>
              <p>
                The leading University in human resource development, knowledge
                and technology generation, and environmental stewardship.
              </p>
              <h3 className={styles.header}>MISSION</h3>
              <p>
                The University of Rizal System is committed to nurturing and
                producing upright and competent graduates and an empowered
                community through relevant and sustainable higher professional
                and technical instruction, research, extension, and production
                services.
              </p>
              <h3 className={styles.header}>CORE VALUES</h3>
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
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Your School Name. All rights
          reserved.
        </p>
      </footer>

      {/* Third Divider - Optional */}
      <hr className={styles.divider} />
    </div>
  );
};

// OfficerItem component to handle each officer's image and title
const OfficerItem = ({ image, title }) => (
  <div className={styles.officerItem}>
    <img src={image} alt={title} className={styles.officerImage} />
    <p>{title}:</p>
  </div>
);

export default PublicPage;
