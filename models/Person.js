const mongoose = require('mongoose');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'], // ✅ Fixed typo
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{3}-\d{3}-\d{4}$/, 'Please enter a valid mobile number (e.g., 123-456-7890)']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

// Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
