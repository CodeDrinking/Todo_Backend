
const  mongoose = require('mongoose');
const {MONGO_URI} = require("../ConfigKeys/keys")

mongoose.connect(MONGO_URI);



//database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

module.exports=db;