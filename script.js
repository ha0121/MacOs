const path = require('path');
const express = require('express');

const app = express();

// Serve static files from project root
app.use('/', express.static(path.join(__dirname, '.')));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
