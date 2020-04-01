const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Cheng:Pc040996@cluster0-ldhqm.mongodb.net/shop?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        })
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();
        }).catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;