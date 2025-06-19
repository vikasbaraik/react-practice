const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const calculationRoutes = require('./routes/calculations');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/calculations', calculationRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
    .catch(err => console.log(err));
