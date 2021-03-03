const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: {
    type: Number,
  },
});

cartProductSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CartProduct = mongoose.model("CartProduct", cartProductSchema);
module.exports = CartProduct;
