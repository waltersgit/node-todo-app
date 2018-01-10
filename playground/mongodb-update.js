/**
 * Created by peter on 2017/11/20.
 */
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a1239bf7307dee7198caeda')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a0e94c98f68e626e103bdc4')
    },{
        $set: {
            name: 'Peter'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })
    // db.close();
});