const customersRouter = require("express").Router();
const Customer = require("../models/customer");

customersRouter.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (exception) {
    next(exception);
  }
});

customersRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const customer = new Customer({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      username: body.username,
      password: body.password,
    });

    const savedCustomer = await customer.save();
    console.log(savedCustomer);
  } catch (exception) {
    next(exception);
  }
});

customersRouter.delete("/:id", async (req, res, next) => {
  try {
    await Customer.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = customersRouter;
