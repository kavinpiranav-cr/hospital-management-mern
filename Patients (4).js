// src/components/Patients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientCard from './PatientCard';
import API_URL from '../api';

const emptyPatient = { name: '', age: '', gender: '' };

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState(emptyPatient);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load all patients once when the page opens
  useEffect(() => {
    axios
      .get(`${API_URL}/patients`)
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setSelectedPatient({ ...selectedPatient, [name]: value });
    } else {
      setNewPatient({ ...newPatient, [name]: value });
    }
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/patients/add`, newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setNewPatient(emptyPatient);
      })
      .catch((error) => console.error('Error adding patient:', error));
  };

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/patients/update/${selectedPatient._id}`, selectedPatient)
      .then((response) => {
        setPatients(
          patients.map((patient) => (patient._id === selectedPatient._id ? response.data : patient))
        );
        cancelEdit();
      })
      .catch((error) => console.error('Error updating patient:', error));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`${API_URL}/patients/delete/${id}`)
      .then(() => {
        setPatients(patients.filter((patient) => patient._id !== id));
        if (selectedPatient && selectedPatient._id === id) cancelEdit();
      })
      .catch((error) => console.error('Error deleting patient:', error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setSelectedPatient(null);
    setIsEditMode(false);
  };

  const formData = isEditMode ? selectedPatient : newPatient;

  return (
    <div className="page">
      <div className="form-section">
        <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>
        <form onSubmit={isEditMode ? handleUpdatePatient : handleAddPatient}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            min="0"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">{isEditMode ? 'Update Patient' : 'Add Patient'}</button>
          {isEditMode && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-section">
        <h3>Patients ({patients.length})</h3>
        {patients.length === 0 && <p className="empty">No patients yet.</p>}
        <div className="card-list">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
