// import {JWT_SECRET} from "../config";
// import jwt from 'jsonwebtoken';
// const  JWT_SECRET = require("../config/index")
const  jwt = require("jsonwebtoken")

const {JWT_SECRET} = require("../ConfigKeys/keys")
// const maxAge = 3 * 24 * 60 * 60;
class jwtService{
    static sign(payload , expiry = "60s" , secret=JWT_SECRET){
        return jwt.sign(payload ,secret , {expiresIn: expiry})
    }
  //this verify is out custom method
    static verify(token , secret=JWT_SECRET){

        //this verify  is jwt method 
        return jwt.verify(token ,secret )
    }
}
module.exports=jwtService ;
