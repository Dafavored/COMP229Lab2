const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const productController = require('./controllers/productController');

app.use(express.json());

// Create a new product
//router.post('/api/products', productController.createProduct);
app.post('/api/products', productController.createProduct);

// Retrieve all products
router.get('/api/products', productController.getAllProducts);

// Retrieve product by id
router.get('/api/products/:id', productController.getProductById);

// Update product by id
router.put('api/products/:id', productController.getProductById)

// delete product by id
router.delete('/api/products/:id', productController.removeProductById);

// Delete all products
router.delete('/api/products', productController.removeAllProducts);

// Retrieve product by name
router.get('/api/products', productController.findProductsByName);


module.exports = router;


app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome To DresStore Application." });
});

// Connect to MongoDB (update the connection string)
mongoose.connect('mongodb+srv://oajakaiye:SR3yhDKVHw9yPyDt@cluster0.kebc3cm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');
})
.catch(err => {
    console.error('Error connecting to the database', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
