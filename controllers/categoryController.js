import prisma from "../config/db.js";

// Show category form
const showCreateForm = async (req, res) => {
  res.render("categories/create");
};

// Show Edit form
const showEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categories/edit", { category });
  } catch (error) {
    console.error("Error fetching category", error);
    res.status(500).send("Error loading category");
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });

    res.render("categories/index", { categories });
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500).send("Error loading categories");
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.redirect("/categories");
  } catch (error) {
    console.error("Error creating category", error);
    res.status(500).send("Error creating category");
  }
};

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updateCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.redirect("/categories");
  } catch (error) {
    console.error("Error updating category", error);
    res.status(500).send("Error updating category");
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.redirect("/categories");
  } catch (error) {
    console.error("Error deleting category", error);
    res.status(500).send("Error deleting category");
  }
};

export {
  showCreateForm,
  showEditForm,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
