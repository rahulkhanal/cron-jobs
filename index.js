const express = require('express');
const app = express();
const cron = require('node-cron');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3333, () => {
  console.log('Example app listening on port 3000!');
});