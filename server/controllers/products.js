const productsRouter = require("express").Router();
const Product = require("../models/product");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (exception) {
    next(exception);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await Product.findById(req.params.id);
    res.json(order);
  } catch (exception) {
    next(exception);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const product = new Product({
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      inStock: body.inStock,
    });

    const savedProduct = await product.save();
    // console.log(savedProduct);
    res.json(savedProduct);
  } catch (exception) {
    next(exception);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = productsRouter;
