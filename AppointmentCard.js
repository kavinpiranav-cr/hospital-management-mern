// src/components/AppointmentCard.js
import React from 'react';

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="card">
      <p>
        <strong>Patient:</strong> {appointment.patientName}
      </p>
      <p>
        <strong>Doctor:</strong> {appointment.doctorName}
      </p>
      <p>
        <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
      </p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(appointment)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(appointment._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
