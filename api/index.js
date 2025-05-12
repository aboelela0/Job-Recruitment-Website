require('dotenv').config();


const applicationRoutes=require('./routes/applicationRoutes');
const cors=require('cors');
const authRoutes= require('./routes/authRoutes');
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const ticketRoutes = require('./routes/ticketRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tickets', ticketRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));