const Product = require("../models/product");
const Category = require("../models/category");
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;
  try {
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};
exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;
  try {
    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        stock,
        images,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
