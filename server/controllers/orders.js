const ordersRouter = require("express").Router();
const Order = require("../models/order");
const Customer = require("../models/customer");
const CartProduct = require("../models/cartProduct");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.json(orders);
  } catch (exception) {
    next(exception);
  }
});

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.json(order);
  } catch (exception) {
    next(exception);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    // Get customer
    const customer = await Customer.findById(body.customerId);
    // console.log("Customer", customer);

    // Get cart
    const cartProducts = await Promise.all(
      body.cart.map(async (item) => {
        const newCartProduct = await new CartProduct({
          product: item.product,
          count: item.count,
        }).save();
        return newCartProduct._id;
      })
    );

    // Create order
    const order = new Order({
      customer: customer,
      cart: cartProducts,
      createdAt: new Date(),
    });

    // Save order
    const savedOrder = await order.save();
    console.log("Saved order", savedOrder);

    // Update customer orders
    customer.orders = customer.orders.concat(savedOrder._id);
    await customer.save();

    res.json(savedOrder);
  } catch (exception) {
    next(exception);
  }
});

module.exports = ordersRouter;
