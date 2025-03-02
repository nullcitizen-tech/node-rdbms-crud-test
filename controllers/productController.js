import prisma from "../config/db.js";

// Show product form with categories for selection
const showCreateForm = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    res.render("products/create", { categories });
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500).send("Error loading form");
  }
};

// Show Edit form
const showEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("products/edit", { product, categories });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).send("Error loading product");
  }
};

// Get all products with pagination
const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await prisma.product.findMany({
      skip,
      take: pageSize,
      orderBy: { name: "asc" },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.render("products/index", {
      products,
      currentPage: page,
      totalPages,
      pageSize,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).send("Error loading products");
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, category_id } = req.body;
  try {
    await prisma.product.create({
      data: {
        name,
        category_id: Number(category_id),
      },
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send("Error creating product");
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;
  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        category_id: Number(category_id),
      },
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).send("Error updating product");
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).send("Error deleting product");
  }
};

export {
  showCreateForm,
  showEditForm,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
