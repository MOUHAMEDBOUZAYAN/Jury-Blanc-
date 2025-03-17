const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/projects', projectRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});