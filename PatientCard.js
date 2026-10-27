// src/components/PatientCard.js
import React from 'react';

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="card">
      <p>
        <strong>Name:</strong> {patient.name}
      </p>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(patient)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(patient._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
