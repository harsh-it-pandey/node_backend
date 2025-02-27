//mongoose file ko import kia hai yahan pe
const mongoose = require('mongoose');
require('dotenv').config();

// define a mongoDB connection URL
//const mongoURL = process.env.DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

//Set up mongoDB connection
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB server'))
    .catch((err) => console.error('MongoDB connection error:', err));

//get a default connection
//mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

//define event listners for the database connection
db.on('connected',()=>{
    console.log('connected to mongDB server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB diconnected');
});

//export the database connection
module.exports = db;