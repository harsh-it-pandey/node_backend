const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username : {
        required: true,
        type : String
    },
    password : {
        required : true,
        type : String
    }
});

personSchema.pre('save',async function (next) {
    const person = this;
    //hash the password only if it has been modified(or is new)
    if(!person.isModified('password'))return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        
        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //override the plain with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword){
   try{
     //use bcrypt to compare the provided password with the hashed password 
     const isMatch = await bcrypt.compare(candidatePassword,this.password);
     return isMatch;
   }catch(err){
    throw err;
   }
}

// Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
