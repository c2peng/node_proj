const Product = require('../models/product.js');
const Cart = require('../models/cart.js')
exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Product',
            path: '/products',
        });
    }).catch(err => {
        console.log(err);
    })
};

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getCarts = (req, res, next) => {
    req.user.getCart().then((cart) => {
        return cart.getProducts()
            .then((products) => {
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }).catch(err => {
        console.log(err);
    })
}

exports.postCarts = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({
            where: {
                id: prodId
            }
        });
    }).then((products) => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return Promise.resolve(product);
        }
        return Product.findByPk(prodId);
    })
    .then((product) => {
        return fetchedCart.addProduct(product, {
            through: {quantity: newQuantity}
        });
    })
    .then(() =>{
        res.redirect('/cart');
    })
    .catch((err) =>{
        console.log(err);
    })
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
    //May also use Product.findAll({where:{id: prod.id}}). And this returns an array
    Product.findByPk(prodId).then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    }).catch(err => {
        console.log(err)
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}