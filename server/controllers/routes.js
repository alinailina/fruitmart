const router = require("express").Router();
const Product = require("../models/product");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    if (body === undefined) {
      return res.status(400).json({
        error: "Body missing",
      });
    }

    const product = new Product({
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      inStock: body.inStock,
    });

    const savedProduct = await product.save();
    console.log(savedProduct);
  } catch (exception) {
    next(exception);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
