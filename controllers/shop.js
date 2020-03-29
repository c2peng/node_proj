const Product = require('../models/product.js');
const Cart = require('../models/cart.js')
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([row, binary]) => {
        res.render('shop/product-list', {
            prods: row,
            pageTitle: 'All Product',
            path: '/products',

        });
    }).catch(err => {
        console.log(err);
    })


};

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch((err) => {

    })

}

exports.getCarts = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll((products) => {
            const productInCart = []
            for (product of cart.products) {
                const checkProduct = products.find(p => p.id === product.id);
                if (checkProduct) {
                    productInCart.push({
                        productData: checkProduct,
                        qty: product.qty
                    });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: productInCart,
            });
        })
    })
}

exports.postCarts = (req, res, next) => {
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
    Product.findById(prodId).then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
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