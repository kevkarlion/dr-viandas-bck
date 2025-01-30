const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true }, // Nuevo campo order_id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Relación con usuario (opcional si no está disponible)
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending" }, // pending, completed, etc.
  paymentDetails: {
    id: { type: String },
    status: { type: String },
    method: { type: String },
    transactionAmount: { type: Number },
    dateApproved: { type: Date },
  },
  payer: {
    email: { type: String },
    id: { type: String },
    identification: {
      type: { type: String },
      number: { type: String },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
