const Product = require('../models/product.js');
const Cart = require('../models/cart.js')
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Product',
            path: '/products',

        });
    });

};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

exports.getCarts = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
    });
}

exports.postCarts= (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path:'/products'
        })
    });

}