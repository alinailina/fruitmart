const ordersRouter = require("express").Router();

const Order = require("../models/order");
const Customer = require("../models/customer");
// const CartItem = require("../models/cartItem");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (exception) {
    next(exception);
  }
});

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(request.params.id);
    res.json(order);
  } catch (exception) {
    next(exception);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const customer = await Customer.findById(body.customerId);
    console.log(customer);

    const order = new Order({
      customer: customer._id,
      cart: [],
      date: new Date(),
    });

    const savedOrder = await order.save();
    console.log(savedOrder);
    customer.orders = customer.orders.concat(savedOrder._id);
  } catch (exception) {
    next(exception);
  }
});

module.exports = ordersRouter;
