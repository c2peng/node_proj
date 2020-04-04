const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODBURI = 'mongodb+srv://Cheng:Pc040996@cluster0-ldhqm.mongodb.net/shop?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: MONGODBURI,
    collection: 'sessions',
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use((req, res , next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user.Id)
    .then((user) => {
        req.user = user;
        next();
    })
})

/*
app.use((req, res, next) => {
    User.findById('5e864a2750254317a1d9f6ab')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

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
        }

        app.listen(3000);

    })
    .catch((err) => console.log(err));