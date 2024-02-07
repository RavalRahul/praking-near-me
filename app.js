const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const randomRoutes = require('./routes/randomRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/random', randomRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
