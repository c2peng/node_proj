const mongodb = require('mongodb');
const getDb = require('../utils/database.js').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //updated
            dbOp = db.collection('products').updateOne({
                _id: new mongodb.ObjectId(this._id)
            }, {
                $set: this
            });
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp.then((result) => {
                console.log(result);
            })
            .catch(err => console.log(err));

    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').find({
                _id: new mongodb.ObjectId(id)
            }).next()
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();

        //only when database is small
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err));

    }

    static deleteById(id) {
        const db = getDb();
        db.collection('products').deleteOne({
                _id: new mongodb.ObjectId(id)
            })
            .then(result => console.log("Deteled"))
            .catch(err => console.log(err));
    }
}

module.exports = Product;