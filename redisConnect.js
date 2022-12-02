const Redis=require("redis")
const redisClient=Redis.createClient(6379,'127.0.0.1')
redisClient.connect()
redisClient.on("connect",(res)=>{
    console.log("redis Connected");
})
module.exports=redisClient