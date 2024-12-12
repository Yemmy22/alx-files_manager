import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

// Use the routes from routes/index.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
