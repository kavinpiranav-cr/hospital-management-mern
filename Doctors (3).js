// src/components/Doctors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import API_URL from '../api';

const emptyDoctor = { name: '', specialty: '' };

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState(emptyDoctor);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load all doctors once when the page opens
  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setSelectedDoctor({ ...selectedDoctor, [name]: value });
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/doctors/add`, newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        setNewDoctor(emptyDoctor);
      })
      .catch((error) => console.error('Error adding doctor:', error));
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/doctors/update/${selectedDoctor._id}`, selectedDoctor)
      .then((response) => {
        setDoctors(
          doctors.map((doctor) => (doctor._id === selectedDoctor._id ? response.data : doctor))
        );
        cancelEdit();
      })
      .catch((error) => console.error('Error updating doctor:', error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`${API_URL}/doctors/delete/${id}`)
      .then(() => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
        if (selectedDoctor && selectedDoctor._id === id) cancelEdit();
      })
      .catch((error) => console.error('Error deleting doctor:', error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setSelectedDoctor(null);
    setIsEditMode(false);
  };

  const formData = isEditMode ? selectedDoctor : newDoctor;

  return (
    <div className="page">
      <div className="form-section">
        <h4>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
        <form onSubmit={isEditMode ? handleUpdateDoctor : handleAddDoctor}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditMode ? 'Update Doctor' : 'Add Doctor'}</button>
          {isEditMode && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-section">
        <h3>Doctors ({doctors.length})</h3>
        {doctors.length === 0 && <p className="empty">No doctors yet.</p>}
        <div className="card-list">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
