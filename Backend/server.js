const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importez le package cors
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

connectDB();

const app = express();

// Middleware pour autoriser les requêtes CORS
app.use(cors());

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});