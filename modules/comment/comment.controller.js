const CommentModel = require('./comment')

const getComments = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await CommentModel.find({ postId: postId })
    res.send({ success: 1, data: comments })
  } catch (err) {
    res.status(400).send({ success: 0, data: err })
  }
}

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body
    const newComment = await CommentModel.create({
      postId,
      content
    })
    res.send({ success: 1, data: newComment })
  } catch (err) {
    res.status(400).send({ success: 0, data: [] })
  }
}

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const dataUpdate = req.body

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      dataUpdate,
      { new: true }
    )
    res.send({ success: 1, data: updatedComment })
  } catch (err) {
    res.status(400).send({ success: 0, data: [] })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const deletedComment = await CommentModel.findByIdAndDelete(commentId)
    res.send({ success: 1, data: deletedComment })
  } catch (err) {
    res.status(400).send({ success: 0, data: [] })
  }
}

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment
}