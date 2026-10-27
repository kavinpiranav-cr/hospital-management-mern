# Hospital Management App (MERN)

Based on the GeeksforGeeks tutorial "Hospital Management Application using MERN Stack".
Add / view / edit / delete **Appointments**, **Doctors** and **Patients**.

```
kavin_fsd/
├── backend/            Express + Mongoose API (port 5000)
│   ├── server.js
│   ├── .env            MongoDB connection string goes here
│   ├── models/         Appointment.js, Doctor.js, Patient.js
│   └── routes/         appointments.js, doctors.js, patients.js
└── frontend/           React app (port 3000)
    ├── public/index.html
    └── src/
        ├── index.js, App.js, App.css, api.js
        └── components/ Appointments, Doctors, Patients (+ Card components)
```

## Run it

**1. Backend** (terminal 1)
```
cd backend
npm install
npm start
```
Expected: `Server is running on port 5000` and `MongoDB database connection established successfully`.

Before this, open `backend/.env` and set `MONGO_URI` to your MongoDB Atlas string
(with `/hospital` as the database name), or keep the local default if MongoDB is installed on the PC.

**2. Frontend** (terminal 2)
```
cd frontend
npm install
npm start
```
Opens http://localhost:3000.

## API

| Method | Endpoint | Action |
|---|---|---|
| GET | `/patients` | List all patients |
| POST | `/patients/add` | Add patient `{ name, age, gender }` |
| POST | `/patients/update/:id` | Update patient |
| DELETE | `/patients/delete/:id` | Delete patient |
| GET | `/doctors` | List all doctors |
| POST | `/doctors/add` | Add doctor `{ name, specialty }` |
| POST | `/doctors/update/:id` | Update doctor |
| DELETE | `/doctors/delete/:id` | Delete doctor |
| GET | `/appointments` | List all appointments |
| POST | `/appointments/add` | Add appointment `{ patientName, doctorName, date }` |
| POST | `/appointments/update/:id` | Update appointment |
| DELETE | `/appointments/delete/:id` | Delete appointment |
