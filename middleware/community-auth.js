const jwt = require('jsonwebtoken');

const JWT_SECRET =
  "We are participating in Nascon and we are proud of that :D";

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_SECRET);

        req.community = decode;
        next();
    }
    catch(err){
        console.log(err);
        if(err.name == 'TokenExpiredError'){
            res.status(401).json({
                message: 'Toke Expired!',
                status: "error"
            });
        }
        else{
            res.status(400).json({
                message: "Authentication Failed!",
                error: err 
            })
        }
        
    }
}