const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO WORK', 'WORKING','WORKED'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('tasks',TaskSchema);