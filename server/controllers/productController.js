const Product = require('../models/product'); // Adjust the path as necessary
const Category = require('../models/category'); // Adjust the path as necessary

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  try {
    // Check if the category exists
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const newProduct = new Product({ name, description, price, category, stock, images });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  try {
    // Check if the category exists
    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, images, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};