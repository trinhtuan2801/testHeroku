//nhiem vu: define nghiep vu -> chon cach xu ly tu controller

const express = require('express')
const router = express.Router()
const postController = require('./post.controller')
const midd1 = require('../../middlewares/middleware1')
const needAuthenticated = require('../../middlewares/needAuthenticated')
const isAdmin = require('../../middlewares/isAdmin')
//router tập hợp các API có điểm chung => cùng tiền tố
// api/posts - api/posts = '/'
// router.get('/',
//   midd1,
//   (req, res, next) => {
//     console.log('middleware2', req.originalUrl)
//     res.send({successful: 0, message: 'Stop here'})
//     // next()
//   },
//   (req, res, next) => {
//     console.log('middleware3', req.query)
//     next()
//   },
//   postController.getPosts)

router.get('/', postController.getPosts)

router.post('/', needAuthenticated, postController.createPost)
router.put('/:postId', needAuthenticated, postController.updatePost)
router.delete('/:postId', needAuthenticated, isAdmin, postController.deletePost)
module.exports = router