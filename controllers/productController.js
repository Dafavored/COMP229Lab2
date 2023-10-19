const Product = require('../model/productmodel');
//import productmodel from "../model/productmodel.js"
// Create a new product
const createProduct = (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save()
        .then(product => {
            res.json(product);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};



// Retrieve all products
const getAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Add other CRUD operations (update, delete, get by ID, etc.)
// Retrieve a product by ID
const getProductById = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Update a product by ID
const updateProductById = (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Remove a product by ID
const removeProductById = (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndRemove(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product removed successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Remove all products
const removeAllProducts = (req, res) => {
    Product.deleteMany({})
        .then(() => {
            res.json({ message: 'All products removed successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Find products by name containing a keyword
const findProductsByName = (req, res) => {
    const keyword = req.query.name;
    Product.find({ name: { $regex: keyword, $options: 'i' } })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    removeProductById,
    removeAllProducts,
    findProductsByName,
};

