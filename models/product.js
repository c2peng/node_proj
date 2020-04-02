const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// no enforcement on scheme
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);