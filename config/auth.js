// import CustomErrorHandler from "../Services/CustomErrorHandler";
// import jwtService from "../Services/jwtService";
const  CustomErrorHandler = require("../services/CustomErrorHandler")
const  jwtService = require("../services/jwtService")


const auth = async (req, res , next) =>{
    let authHeader = req.headers.authorization
    console.log(authHeader);

    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());

    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    
    try{
        const {_id } = jwtService.verify(token)
        req.user= {};
        req.user._id= _id;

        next();
    }
    catch(err){

    }
}

module.exports= auth;