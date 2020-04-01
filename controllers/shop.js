const Product = require('../models/product.js');


exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
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
    Product.fetchAll().then(products => {
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
    req.user.getCart().then((products) => {
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products,
                })
            })
            .catch(err => {
                console.log(err);
            });

}

exports.postCarts = async (req, res, next) => {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']}).then((orders) =>{
        res.render('shop/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders: orders,
        });
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
    Product.findById(prodId).then((product) => {
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
    req.user.getCart().then((cart) => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            const product = products[0];
            product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder().then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = {
                        quantity: product.cartItem.quantity
                    };
                    return product;
                }));
            });
        })
        .then((result) => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            res.redirect('orders');
        })
        .catch(err => {
            console.log(err);
        })
}