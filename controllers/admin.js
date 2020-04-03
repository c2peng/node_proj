const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user
    });
    await product.save();
    console.log("Created Product");
    res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.find().populate('userId');
    console.log(products);
    res.render('admin/products', {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
    });
};

exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    product = await Product.findById(prodId);
    res.render('admin/edit-product', {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    }).then(() => {
        console.log("updated product");
        res.redirect('/admin/products');
    })

}

exports.postDeleteProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    await Product.findByIdAndRemove(prodId);
    res.redirect('/admin/products');
}