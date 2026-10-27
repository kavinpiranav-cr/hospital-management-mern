// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Atlas or local, from .env)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.get('/', (req, res) => res.send('Hospital Management API is running'));

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
