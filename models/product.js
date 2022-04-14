const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  img: String,
  description: String
}, {
  timestamps: true
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel