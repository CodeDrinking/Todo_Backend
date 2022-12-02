const Todos = require('../models/todos')
const Joi = require('joi');
const redisClient = require('../redisConnect');
// const Joi = require('joi')




module.exports.create = async function( req , res , next){
   const todosSchema = Joi.object({
        userId :  Joi.string().required(),
        title :  Joi.string().required(),
        completed :  Joi.boolean().required(), 
    
    });
            //validation
            const {error} = todosSchema.validate(req.body);
            if(error){
                return next(error) 
            }

            const { userId, title, completed } = req.body;
            let todoss;
            try {
                todoss = await Todos.create({
                    userId,
                    title,
                    completed
                }).then((data)=>{
                    res.status(201).json(data);
                    console.log("deleting cached todoss");
                    redisClient.del("todoss");
                });
            }
            catch(err){
                return next (err)
            }
    }

module.exports.index = async function( req , res , next){
        // let keyName = "NameKey";
        // const getCatchData = await 
        let todoss;
        try{
       let keyName= "todoss"
        const result = await redisClient.get(keyName);
        if(result){
            console.log("caching todos");
            res.status(201).json(JSON.parse(result)); // received in string and we have to make it json
        }

        else{
            console.log("fetching todos");
            todoss = await Todos.find({}).then((todoss)=>{
            redisClient.set(keyName ,JSON.stringify(todoss));
            res.status(200).json(todoss);
           })
         }
    }catch(err){
        return next (err)
    }
    // res.status(200).json(todoss);

}
    //      let todoss;
    //      todoss = await Todos.find({});
    //   }
    //   catch(err){
    //       return next (err)
    //   }
    //   res.status(201).json(todoss);

 module.exports.show = async function( req , res , next){

    const oneTodo = await redisClient.get('todoss');
    console.log(oneTodo);
    if(oneTodo){
        try{
        console.log("fetching single Todo");
        let result = JSON.parse(oneTodo)?.filter(
            (one) => one?._id ==req.params.id
            );
            return res.status(200).json(...result)
            console.log(result);
        }
        catch(err){
            return next (err)
        }
    }
    else{
        console.log("fetching from DB");
        try{
           Todos.findById({_id : req.params.id})
            .then((data) =>{
                res.status(200).json(data);
            });
        }
        catch(err){
            return next (err)
        }
    }
                    //  let todoss;
                    //  try {
                    //      todoss = await Todos.findById({_id : req.params.id});
                    //  }
                    //  catch(err){
                    //      return next (err)
                    //  }
                 //  res.status(201).json({todoss});

 }

module.exports.destroy = async function( req , res , next){
        
                try {
                    // todoss = await Todos.findByIdAndDelete({_id : req.params.id});
                    // if(!todoss){
                    //     return next(new Error("Nothing to delete"))
                    // }
                    let todoss = await Todos.findByIdAndDelete({_id : req.params.id}).then((data)=>{
                    res.status(204).send("deleted");
                    redisClient.del("todoss");
                    res.status(200).json(todoss);
                });
            }
            
                catch(err){
                    return next (err)
                }
            
            }
            
        


     
         
         
    
