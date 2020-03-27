module.exports = (req, res, next) => {
    res.statusCode = 404;
    res.render('404', {pageTitle: 'Page Not Found', path: 'None'});
};