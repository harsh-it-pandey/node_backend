const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { request } = require('http');

// Endpoint to create a new Person
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Validate 'work' field (if required)
        if (!['chef', 'waiter', 'manager'].includes(data.work)) {
            return res.status(400).json({ error: 'Invalid work role' });
        }

        // Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved:', response);
        res.status(200).json(response); // ✅ 201 Created
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

router.get('/',async(req,res)=>{
    try{
       const data = await Person.find();
       console.log('data fetched');
       res.status(200).json(data);
    }catch(err){
       console.log(err);
       res.status(500).json({error : "Internal server error"});
    }
})

//paramterized API 
router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType;//extract the worktype fro the URL parameter
        if(workType=='chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error : "Invalid work type"})
        }
    }catch(err){
        console.log(err);
        re.status(500).json({error: 'Internal server Error'});
    } 
})

//PUT(UPDATE) the person data
router.put('/:id', async (req,res)=>{
    try{
       const personId = req.params.id;// extract the id from the URL parameter
       const updatedPersonData = req.body; //updated data for the person

       const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new : true, // return the updated document
        runValidators: true , // run mongooose validation
       })
        
       if(!response){
        return res.status(404).json({error : 'Person not found'});
       }

       console.log('data updated');
       res.status(200).json(response);

    }
    catch(err){
       console.log(err);
       res.status(500).json({error : 'Internal server Error'});
    }
})

router.delete('/:id', async (req,res)=>{
    try{
       const personId = req.params.id;//extract the person's ID from the URL parameter
       // assuminng you have a person model
       const response = await Person.findByIdAndDelete(personId);
       if(!response){
           return res.status(404).json({error : 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json(response);

    }catch(err){
       console.log(err);
       res.status(500).json({error : 'Internal server error'});
    }
})

module.exports = router;
