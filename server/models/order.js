const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartProduct",
    },
  ],
  createdAt: Date,
});

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
