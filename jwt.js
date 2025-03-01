const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{

    //first check request header has authhorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : 'Token not found'});

    // extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'Unauthorized'});

    try{
       // verift the JWT token
       const decoded = jwt.verify(token,process.env.JWT_SECRET);

       // attach user information to the request object
       req.user = decoded;// yahan pe req.EncodedData,req.userData bhi likh skte hai
       next();

    }catch(err){
    console.error(err);
    res.status(401).json({error : 'Invalid token'});
    }
}

//fuction to generate JWT token
const generateToken = function (userData) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set in environment variables.");
    }
    return jwt.sign(userData, process.env.JWT_SECRET);
};


module.exports = {jwtAuthMiddleware,generateToken};