const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  products: {
    type: [Object],
    default: []
  }
}, {
  timestamps: true
})

const CartModel = mongoose.model('Cart', cartSchema)

module.exports = CartModel