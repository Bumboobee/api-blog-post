const express = require("express")
const app = express();
const mongoose = require("mongoose")
require("dotenv/config")
const bodyParser = require("body-parser")
const postRoute = require('./routes/posts');

app.use(bodyParser.json())

app.use('/posts', postRoute)

const dbConnection = process.env.CONNECTION_STRING;

mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "your-database-name" // Specify your database name here
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});