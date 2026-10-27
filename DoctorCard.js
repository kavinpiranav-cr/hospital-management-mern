// src/components/DoctorCard.js
import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="card">
      <p>
        <strong>Name:</strong> {doctor.name}
      </p>
      <p>
        <strong>Specialty:</strong> {doctor.specialty}
      </p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(doctor)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(doctor._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
