const express = require('express');
const shopController = require('../controllers/shop');


const router = express.Router();
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCarts);

router.post('/cart', shopController.postCarts);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);
module.exports = router;