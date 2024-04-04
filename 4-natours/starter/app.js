const express = require('express');
const fs = require('fs');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } }); //Here we format out response read from the tours file in a JSEND format
});

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${3000}`);
});
