const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

const CommentModel = mongoose.model('Comment', commentSchema)

module.exports = CommentModel

