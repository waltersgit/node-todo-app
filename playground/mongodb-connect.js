/**
 * Created by peter on 2017/11/17.
 */
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'gogo go',
    //     completed: false
    // },(err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })
    // db.collection('Users').insertOne({
    //     name: 'Peter',
    //     age: 25,
    //     location: 'Taipei'
    // },(err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // },(err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`todos count: ${count}`);
    // },(err) => {
    //     console.log('Unable to fetch todos', err);
    // })
    db.collection('Users').find({name: 'John'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    },(err) => {
        console.log('Unable to fetch todos', err);
    })
    // db.close();
});