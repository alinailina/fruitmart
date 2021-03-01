const ordersRouter = require("express").Router();

const Order = require("../models/order");
const Customer = require("../models/customer");
const CartItem = require("../models/cartItem");
// const Product = require("../models/product");

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
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (exception) {
    next(exception);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    // Get customer (all good)
    const customer = await Customer.findById(body.customer);
    // console.log("Customer", customer);

    // Get products (problem here)
    const cartItems = body.cart.map((item) => {
      return new CartItem({
        product: item.product,
        count: item.count,
      });
    });

    // Create order
    const order = new Order({
      customer: customer,
      cart: cartItems,
      date: new Date(),
    });

    // Save order
    const savedOrder = await order.save();
    console.log("Saved order", savedOrder);

    // Atm this is what I'm getting
    // I'm happy about referencing orders in customer.orders by id.
    // But! I wish my order.cart.product had all product info,instead of just id
    // And if I check the same object from http://localhost:3001/api/orders,
    // I only see the ids of cart objects, so to query data later I'd have to go through multiple layers of ids... that doesn't seem right, does it?

    // {
    //   "cart": [
    //     {
    //       "product": "6038d37d7560af5fba6dd4e5",
    //       "count": 5,
    //       "id": "603cdd4210f1ab2e737fe054"
    //     },
    //     {
    //       "product": "6038d37d7560af5fba6dd4e6",
    //       "count": 10,
    //       "id": "603cdd4210f1ab2e737fe055"
    //     }
    //   ],
    //   "customer": {
    //     "orders": [
    //       "603cd666cf002c11170dfe20",
    //       "603cd7ee69fcc617fb1a501f",
    //       "603cdc6010f1ab2e737fe053",
    //       "603cdd4210f1ab2e737fe056"
    //     ],
    //     "firstname": "Elon",
    //     "lastname": "Musk",
    //     "email": "elon.musk@mail.com",
    //     "username": "elonmusk",
    //     "password": "1234",
    //     "id": "603cd4b34b16b702b4c459c7"
    //   },
    //   "date": "2021-03-01T12:25:38.308Z",
    //   "id": "603cdd4210f1ab2e737fe056"
    // }

    // Update customer orders
    customer.orders = customer.orders.concat(savedOrder._id);
    await customer.save();

    res.json(savedOrder);
  } catch (exception) {
    next(exception);
  }
});

module.exports = ordersRouter;
