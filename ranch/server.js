// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb'); // MongoDB driver

// Import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// Initialize express app
var app = express();

// MongoDB connection setup
const uri = "mongodb+srv://brooklynvkelsey:rsT5omiKSfZTS9js@mycluster.eviwh.mongodb.net/Ranch?retryWrites=true&w=majority&appName=MyCluster";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB when the server starts
client.connect()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use MongoClient throughout the app
const database = client.db('Ranch');
const cowsCollection = database.collection('Cows');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(logger('dev'));

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  next();
});

// Fetch all cows from MongoDB
app.get('/api/cows', async (req, res) => {
  try {
    const cows = await cowsCollection.find().toArray();
    res.status(200).json(cows);  // Return cows as JSON response
  } catch (error) {
    console.error('Error fetching cows:', error);  // Log detailed error information
    res.status(500).json({ error: 'Failed to fetch cows', details: error.message });
  }
});

// Fetch a single cow by ID
app.get('/api/cows/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const cow = await cowsCollection.findOne({ id: id });
    if (!cow) {
      res.status(404).send('Cow not found');
    } else {
      res.json(cow);
    }
  } catch (error) {
    console.error('Error fetching cow by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new cow to MongoDB
app.post('/api/cows', async (req, res) => {
  const newCow = req.body;
  try {
    const result = await cowsCollection.insertOne(newCow);
    res.json(result.ops[0]); // Return the inserted cow
  } catch (error) {
    console.error('Error adding cow:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing cow
app.put('/api/cows/:id', async (req, res) => {
  const id = req.params.id;
  const updatedCow = req.body;
  try {
    const result = await cowsCollection.updateOne(
      { id: id },
      { $set: updatedCow }
    );
    if (result.modifiedCount > 0) {
      res.json(updatedCow);
    } else {
      res.status(404).send('Cow not found');
    }
  } catch (error) {
    console.error('Error updating cow:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a cow
app.delete('/api/cows/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await cowsCollection.deleteOne({ id: id });
    if (result.deletedCount > 0) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).send('Cow not found');
    }
  } catch (error) {
    console.error('Error deleting cow:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve static files for frontend (Angular app)
app.use(express.static(path.join(__dirname, 'dist/ranch/browser')));

// Add route for the default page (index route)
app.use('/', index);

// Map all non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ranch/browser/index.html'));
});

// Set the port and start the server
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});
