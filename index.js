
//     const jsonString = '{"name":"john","age":30,"city":"new york"}';
//     const jsonObject = JSON.parse(jsonString);
//     console.log(jsonObject.name);
    
//     const objectToConvert = {
//          name : "Alice",
//          age : 25
//     };
    
//     const jsonString2 = JSON.stringify(objectToConvert);
//     console.log(jsonString2);

const express = require('express');
const app = express();
const db = require('./db'); // Ensure MongoDB connection works
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Allows JSON request bodies
const PORT = process.env.PORT || 4826;

const Person = require('./models/Person'); // Ensure filename matches exactly
const MenuItem = require('./models/MenuItem');

// Basic route
app.get('/', (req, res) => {
    res.send('WELCOME TO OUR HOTEL');
});



//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
//use the router
app.use('/Person',personRoutes);
app.use('/menu',menuItemRoutes);



// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:4826');
});

// this is to check update in github