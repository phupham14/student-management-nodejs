const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('.\\Student_routes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://phupham14:S76qLYwMuc0GOeRB@cluster0.cit66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/students', studentRoutes);

app.listen(8000, () => console.log('Server running on port 8000'));
