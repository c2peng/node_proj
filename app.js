const http = require('http');
const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const db = require('./utils/database');
const shopRoutes = require('./routes/shop.js');
const bodyParser = require('body-parser');
const handle_404 = require('./controllers/404');
const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(handle_404);


app.listen(3000);