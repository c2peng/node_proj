const http = require('http');
const path = require('path');
const express = require('express');

const adminData = require('./routes/admin.js');

const shopRoutes = require('./routes/shop.js');
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser');

const app = express();
app.engine('handlebars',expressHbs({layoutDir: 'views/layouts', defaultLayout:'main-layout'}));
app.set('view engine', 'handlebars');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.statusCode = 404;
    res.render('404',{pageTitle: 'Page Not Found'});
})


app.listen(3000);