// src/components/Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import API_URL from '../api';

const emptyAppointment = { patientName: '', doctorName: '', date: '' };

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState(emptyAppointment);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load all appointments once when the page opens
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching appointments:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setSelectedAppointment({ ...selectedAppointment, [name]: value });
    } else {
      setNewAppointment({ ...newAppointment, [name]: value });
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/appointments/add`, newAppointment)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setNewAppointment(emptyAppointment);
      })
      .catch((error) => console.error('Error adding appointment:', error));
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/appointments/update/${selectedAppointment._id}`, selectedAppointment)
      .then((response) => {
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === selectedAppointment._id ? response.data : appointment
          )
        );
        cancelEdit();
      })
      .catch((error) => console.error('Error updating appointment:', error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`${API_URL}/appointments/delete/${id}`)
      .then(() => {
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
        if (selectedAppointment && selectedAppointment._id === id) cancelEdit();
      })
      .catch((error) => console.error('Error deleting appointment:', error));
  };

  const handleEditAppointment = (appointment) => {
    // <input type="date"> needs the date as YYYY-MM-DD
    setSelectedAppointment({
      ...appointment,
      date: appointment.date ? appointment.date.slice(0, 10) : '',
    });
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setSelectedAppointment(null);
    setIsEditMode(false);
  };

  const formData = isEditMode ? selectedAppointment : newAppointment;

  return (
    <div className="page">
      <div className="form-section">
        <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
        <form onSubmit={isEditMode ? handleUpdateAppointment : handleAddAppointment}>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditMode ? 'Update Appointment' : 'Add Appointment'}</button>
          {isEditMode && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-section">
        <h3>Appointments ({appointments.length})</h3>
        {appointments.length === 0 && <p className="empty">No appointments yet.</p>}
        <div className="card-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
