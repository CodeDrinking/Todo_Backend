
const  Joi = require("joi")
const  User = require("../models/User")
const  CustomErrorHandler = require("../services/CustomErrorHandler")
const  bcrypt = require("bcrypt")
const  jwtService = require("../services/jwtService")




module.exports.register = async function (req , res , next){
        const registerSchema = Joi.object({
            name :  Joi.string().min(3).max(30).required(),
            email :  Joi.string().email().required(),
            password :  Joi.string().required(),
            repeat_password :  Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);

        if(error){
            return next(error)
        }
//check if user alredy in database
         try{ 
            const exist =  await User.exists({ email : req.body.email });

            if(exist){
                return next(CustomErrorHandler.alreadyExists('this email is alredy taken'))
                
            }
        }
         catch(err){
            return next(err)
    
       }


       //hash password
       const hashedPassword = await bcrypt.hash(req.body.password ,10);

       //prepare the model
       const user  = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
       })

       console.log(user);
       let access_Token;
       try{
        const result = await user.save();
        // console.log(result);

        //Token
        access_Token= jwtService.sign({_id:result._id })
        console.log(access_Token);
        res.cookie("jwt" ,access_Token,{
            withCredentials:true,
            httpOnly :false,
            // maxAge: "60s"
           })
        //    res.json({status:"okkk", data:  access_Token , user})
        res.status(201).json({user:user._id , created :true});
       }


        catch (err){
        return next(err);
        }
        //  res.json( { access_Token : access_Token  })
        
    }
