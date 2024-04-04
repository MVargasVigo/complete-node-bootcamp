const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //This is middleware, a function that can modify the incoming request data. It stands in the middle of the request and the response. A step that the req goes through while it's being processed.

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Handling GET request
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } }); //Here we format out response read from the tours file in a JSEND format
});

app.post('/api/v1/tours', (req, res) => {
  //In post methods, we work with the request
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //Object.assign creates an object by merging two objects together.
  tours.push(newTour); //Here we push the new tour into the array of tours.
  fs.writeFile(
    //Here we rewrite the file with the new data, the tours variable with the new tour
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { newTour } });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${3000}`);
});
