/**
 * Created by peter on 2017/11/20.
 */
var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    usePushEach: true
});
var Todo = mongoose.model('Todo',TodoSchema);
// var Todo = mongoose.model('Todo',{
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     },
//     completedAt:{
//         type: Number,
//         default: null
//     },
//     _creator: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     }
// });
module.exports = {Todo};