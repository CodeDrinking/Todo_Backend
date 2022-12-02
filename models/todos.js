const mongoose = require('mongoose')

const TodosSchema = new mongoose.Schema({

    userId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true
    },

}, {
    timestamps: true
});

module.exports=mongoose.model('Todos', TodosSchema);

