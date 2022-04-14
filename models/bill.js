const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  products: {
    type: [Object],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const BillModel = mongoose.model('Bill', billSchema)

module.exports = BillModel