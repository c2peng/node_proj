const http = require('http');
const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const bodyParser = require('body-parser');
const handle_404 = require('./controllers/404');
const app = express();
const User = require('./models/user.js');
const Product = require('./models/product.js');
const mongoConnect = require('./utils/database.js').mongoConnect;
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('5e8416aac9534a407f1c3988')
        .then((user) => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch((err) => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(handle_404);

mongoConnect(() => {
    app.listen(3000);
});