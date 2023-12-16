const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // You can choose any available port

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017'; // Change this to your MongoDB connection string
const dbName = 'Wedding'; // Change this to your database name
const collectionName = 'audio'; // Change this to your collection name

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  app.post('/save-audio', (req, res) => {
    const { name, audioData } = req.body;

    db.collection(collectionName).insertOne({ name, audioData }, (err, result) => {
      if (err) {
        console.error('Error saving audio to MongoDB:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Audio saved successfully');
        res.status(200).send('OK');
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
