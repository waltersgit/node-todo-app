/**
 * Created by peter on 2017/11/20.
 */
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    //delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //delete one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result)
    // })

    // db.collection('Users').deleteMany({name: 'Peter'});

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5a0e9a7c701d2d2971334cc3")
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })
    // db.close();
});