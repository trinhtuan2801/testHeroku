const mongoose = require('mongoose')

const purchasesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  bills: {
    type: [Object],
    default: []
  }
}, {
  timestamps: true
})

const PurchasesModel = mongoose.model('Purchases', purchasesSchema)

module.exports = PurchasesModel