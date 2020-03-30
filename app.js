const http = require('http');
const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const sequelize = require('./utils/database.js');
const shopRoutes = require('./routes/shop.js');
const bodyParser = require('body-parser');
const handle_404 = require('./controllers/404');
const app = express();
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
    })
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(handle_404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

sequelize.sync().then((result) => {
    return User.findByPk(1);
}).then((user) => {
    if (!user) {
        return User.create({
            name: 'Max',
            email: 'max@gmail.com'
        });
    }
    return Promise.resolve(user);
}).then((user) => {
    user.getCart().then((cart) => {

        if (!cart) {
            return user.createCart();
        }
        return Promise.resolve(cart);
    })
}).then((user) => {
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});