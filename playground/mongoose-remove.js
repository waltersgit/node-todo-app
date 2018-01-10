/**
 * Created by peter on 2017/12/20.
 */
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
})

Todo.findOneAndRemove('5a39d5151bf622a0931409d0').then((todo) => {
    console.log(todo);
})

Todo.findOneAndRemove({_id: '5a39dc0d1bf622a093140aa7'}).then((todo) => {
    console.log(todo);
})