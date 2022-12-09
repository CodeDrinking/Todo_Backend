const express = require("express")
const routes = require('./routes/index')
const app = express();
const PORT = 8000;
const cors=require("cors");
cookieParser = require('cookie-parser');
const db= require('./config/mongoose')
const redisClient=require("./redisConnect");



app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     method : ["get" , "get"],
//     credentials:true
// }))

app.get('/' ,async (req , res) => {
    let keyName = 'keyName';
    let getCacheData= await redisClient.get(keyName);
    let result = {
        id : 12,
        name : " test demo"
    }
    let responseArray = '';
    if(getCacheData){
        responseArray = JSON.parse(getCacheData)
        console.log("GET CACHE");
    }
    else{
        console.log("SET CACHE");
        redisClient.set(keyName , JSON.stringify(result))
        responseArray=result;
    }
    console.log(getCacheData);
    res.status(200).json(responseArray ,res.status(200).json( "Welcome to Todo api ...... /api/todos(for all) ,/api/todos/:id(get one) , /api/todos/:id{for delete) ,/api/todos/login etc..."))
})

app.use(express.json());
app.use(cookieParser());
app.use('/api' ,routes );


// if(process.env.NODE_ENV == 'production'){
//     const path = require('path')
//      app.get('/' ,(req ,res)=>{
//         res.use(express.static(path.resolve(__dirname , 'Client' , 'build')))

//         res.sendFile(path.resolve(__dirname , 'Client' , 'build' ,'index.html'))
//      })
// }
app.listen( PORT ,  () => console.log(`app is runnning on port ${PORT}`))
