const express = require('express')
const router = express.Router()
const commentController = require('./comment.controller')

router.get('/:postId', commentController.getComments)
router.post('/', commentController.createComment)
router.put('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router