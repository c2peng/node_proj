const http = require('http');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const bodyParser = require('body-parser');
const handle_404 = require('./controllers/404');
const app = express();
const User = require('./models/user.js');
const Product = require('./models/product.js');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('5e864a2750254317a1d9f6ab')
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(handle_404);

mongoose.connect('mongodb+srv://Cheng:Pc040996@cluster0-ldhqm.mongodb.net/shop?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        if (User.find().length === 0) {
            const user = new User({
                name: 'Cheng',
                email: 'cluster0@cl',
                cart: {
                    items: []
                }
            });
            user.save();
        }
        app.listen(3000);
    })
    .catch((err) => console.log(err));