const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true }, // ID único de la orden
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Ya no es obligatorio
  items: [
    {
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  totalPrice: { type: Number }, // Ya no es obligatorio
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  paymentDetails: {
    id: { type: String },
    status: { type: String },
    method: { type: String },
    transactionAmount: { type: Number },
    dateApproved: { type: Date },
  },
  payer: {
    email: { type: String }, // Ya no es obligatorio
    id: { type: String },
    identification: {
      type: { type: String },
      number: { type: String },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware para actualizar `updatedAt` antes de guardar cambios
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
