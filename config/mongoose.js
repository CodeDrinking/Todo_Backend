
const  mongoose = require('mongoose');
// const {MONGO_URI} = require("../ConfigKeys/keys")

mongoose.connect("mongodb+srv://roshan_123:Roshan1102@cluster0.ugpv4zv.mongodb.net/TodoTest");



//database connection
const db = mongoose.connection;
mongoose.set('strictQuery', true);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

module.exports=db;
