const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Danh mục không tồn tại" });
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
    });

    await product.save();
    res.status(201).json({ message: "Sản phẩm mới đã được tạo", product });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error });
  }
};

// Lấy danh sách tất cả sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name"); // Lấy thông tin danh mục liên quan
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.quantity = quantity || product.quantity;
      product.category = category || product.category;

      await product.save();
      res.json({ message: "Sản phẩm đã được cập nhật", product });
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: "Sản phẩm đã bị xóa" });
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
