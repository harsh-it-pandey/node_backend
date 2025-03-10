const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;//username and password strategy
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (UESRNAME,password,done) => {
    // authentication logic here
    try{
       //console.log('Received Credentials:', UESRNAME,password );
       const user = await Person.findOne({username : UESRNAME});
       if(!user){
        return done(null,false, {message : 'Incorrect username.'});
       }

       const isPasswordMatch = await user.comparePassword(password);
       if(isPasswordMatch){
         return done(null, user);
       }
       else{
        return done(null,false,{message : 'Incorrect Passord'});
       } 
       
    }catch(err){
       return done(err);
    }
}))

module.exports = passport;//export configured passport
