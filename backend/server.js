const express = require('express');
const cors = require('cors');

const app = express();
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
const PORT = process.env.PORT || 4000;
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});