/**
 * Created by peter on 2017/11/20.
 */
require('./config/config');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    })
})

app.get('/', (req, res) => {
    res.send('todo app test2');
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos})
    }),(e) => {
        res.status(400).send(e);
    }
})

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

})

app.delete('/todos/:id', authenticate, async (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    }

    try{
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }catch(e){
        res.status(400).send()
    }


    // Todo.findOneAndRemove({
    //     _id: id,
    //     _creator: req.user._id
    // }).then((todo) => {
    //     if(!todo){
    //         return res.status(404).send();
    //     }
    //     res.send({todo});
    // }).catch((e) => {
    //     res.status(400).send();
    // })
})

app.patch('/todos/:id', authenticate,(req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    // Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) => {
    //     if(!todo){
    //         return res.status(404).send()
    //     }
    //     res.send({todo});
    // }).catch((e) => {
    //     res.status(400).send();
    // })

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {
        $set: body
    },{
        new: true
    }).then((todo) => {
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.post('/users', async (req, res) => {
    try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        await user.save();
        const token = await User.generateAuthToken(user);
        //const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    }catch(e){
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     return user.generateAuthToken();
    //     // res.send(user);
    // }).then((token) => {
    //     res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

app.get('/users/me', authenticate,(req, res) => {
    res.send(req.user);
})

app.post('/users/login', async (req, res) => {
    try{
        const body = _.pick(req.body, ['email','password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await User.generateAuthToken(user);
        res.header('x-auth', token).send(user);
    }catch(e){
        res.status(400).send();
    }
    // var body = _.pick(req.body, ['email','password']);
    // User.findByCredentials(body.email, body.password).then((user) => {
    //     return user.generateAuthToken().then((token) => {
    //         res.header('x-auth', token).send(user);
    //     })
    // }).catch((e) => {
    //     res.status(400).send();
    // })
})

app.delete('/users/me/token', authenticate, async (req, res) => {
    // req.user.removeToken(req.token).then(() => {
    //     res.status(200).send();
    // }, () => {
    //     res.status(400).send();
    // })
    try{
        await req.user.removeToken(req.token);
        res.status(200).send()
    }catch(e){
        res.status(400).send();
    }

})

if(!module.parent){
    app.listen(port, () => {
        console.log('started on port 3000');
    })
}


module.exports = {app};