// EventModal.js
import React from 'react';
import styles from './Dashboard.module.css';

const EventModal = ({ isModalOpen, setModalOpen, eventData, handleInputChange, handleFileChange, handleModalSubmit }) => {
  if (!isModalOpen) return null; // Don't render the modal if it's closed

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Add Event</h3>
        <form onSubmit={handleModalSubmit} encType="multipart/form-data">
          <div className={styles.formGroup}>
            <label>Venue:</label>
            <select
              name="venue"
              value={eventData.venue}
              onChange={handleInputChange}
              required
              className={styles.input}
            >
              <option value="">Select Venue</option>
              <option value="Venue 1">Court</option>
              <option value="Venue 2">Room 101</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={eventData.name}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Organization:</label>
            <select
              name="organization"
              value={eventData.organization}
              onChange={handleInputChange}
              required
              className={styles.input}
            >
              <option value="">Select Organization</option>
              <option value="COE">COE</option>
              <option value="CBA">CBA</option>
            </select>
          </div>
          <div className={styles.formGroup}>
  <label>From Date:</label>
  <input
    type="date"
    name="fromDate"
    value={eventData.fromDate}
    onChange={handleInputChange}
    required
    className={styles.input}
  />
</div>
<div className={styles.formGroup}>
  <label>To Date (Optional):</label>
  <input
    type="date"
    name="toDate"
    value={eventData.toDate}
    onChange={handleInputChange}
    className={styles.input}
  />
</div>

          <div className={styles.formGroup}>
  <label>Time Duration:</label>
  
  <div className={styles.timeGroup}>
  <span>From:</span>
    <div className={styles.timeFromGroup}>
      <select
        name="fromHour"
        value={eventData.fromHour}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        <option value="">Select Hour</option> {/* Empty option for hour */}
        {[...Array(12).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select
        name="fromMinute"
        value={eventData.fromMinute}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        {[...Array(60).keys()].map((i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        name="fromAmPm"
        value={eventData.fromAmPm}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        <option value="">Select AM/PM</option> {/* No default selection */}
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>

    <span>to:</span>

    <div className={styles.timeToGroup}>
      <select
        name="toHour"
        value={eventData.toHour}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        <option value="">Select Hour</option> {/* Empty option for hour */}
        {[...Array(12).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select
        name="toMinute"
        value={eventData.toMinute}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        {[...Array(60).keys()].map((i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        name="toAmPm"
        value={eventData.toAmPm}
        onChange={handleInputChange}
        className={styles.timeInput}
      >
        <option value="">Select AM/PM</option> {/* No default selection */}
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  </div>
</div>




          <div className={styles.formGroup}>
            <label>Document:</label>
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Poster:</label>
            <input
              type="file"
              name="poster"
              onChange={handleFileChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.modalFooter}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
