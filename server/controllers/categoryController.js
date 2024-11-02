const Category = require("../models/categoryModel");

// Tạo danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();
    res.status(201).json({ message: "Danh mục mới đã được tạo", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo danh mục", error });
  }
};

// Lấy danh sách tất cả danh mục
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      await category.save();
      res.json({ message: "Danh mục đã được cập nhật", category });
    } else {
      res.status(404).json({ message: "Danh mục không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error });
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.remove();
      res.json({ message: "Danh mục đã bị xóa" });
    } else {
      res.status(404).json({ message: "Danh mục không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
