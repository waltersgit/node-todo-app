/**
 * Created by peter on 2017/11/28.
 */
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a13a1c079131cc914d5346c';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos',todos);
})

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo',todo);
})

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Id not found')
    }
    console.log('Todo By Id',todo);
}).catch((e) => {
    console.log(e);
})