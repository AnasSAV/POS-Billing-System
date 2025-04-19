const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Add this line

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from Live Server
    credentials: true
}));
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes); // Add product routes

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
