const  Joi = require("joi")
const  User = require("../models/User")
const  CustomErrorHandler = require("../services/CustomErrorHandler")
const  bcrypt = require("bcrypt")
const  jwtService = require("../services/jwtService")


module.exports.login = async function(req , res , next){

        const loginSchema = Joi.object({
            email :  Joi.string().email().required(),
            password :  Joi.string().required()
        });
        const {error} = loginSchema.validate(req.body);

        if(error){
            return next(error);
        }
        
        try{
            const user= await User.findOne({email:req.body.email});
            if(!user){
                return next (CustomErrorHandler.wrongCred())
            }
            console.log(user , req.body.password);
            const match = await bcrypt.compare(req.body.password , user.password);

            if(!match){
                return next(CustomErrorHandler.wrongCred())
            }
            //token
           const access_Token= jwtService.sign({_id:user._id})
           res.json({status:"okkk", data:  access_Token , user})

        }
        catch(err){
            return next(err)
        }   
    }

    module.exports.logout = async function (req , res ,next){

         //validation
         const refreshSchema = Joi.object({
            refresh_token :  Joi.string().required(),
        });
        const {error} = refreshSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
            await RefreshToken.deleteOne({token :req.body.refresh_token})
        }
        catch(err) {
            return next( new Error('something wrong in the database'))
        }
        res.json({status :1})
    }

    module.exports.userDetails = async function(req , res , next){
        try{
            const user =  await User.findOne({_id :req.user._id}).select('-password -updatedAt -__v  ')
            if(!user){
                return next(CustomErrorHandler.notFound());
            }
            res.json(user);
        }
        catch(err){
            return  next(err)
        }
    }
   



