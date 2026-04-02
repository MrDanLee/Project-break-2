const express = require('express');
const { prototype } = require('node:events');
const app = express();
const PORT = process.env.PORT || 8001;


app.use('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});