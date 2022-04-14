const PostModel = require('./post')
const jwt = require('jsonwebtoken')
const UserModel = require('../auth/user')

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
    res.send({ success: 1, data: posts })
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }

}

const createPost = async (req, res) => {
  try {
    console.log(req.user)
    const senderUser = req.user
    const { title, description, imageUrl } = req.body

    const newPost = await PostModel.create({
      title,
      description,
      imageUrl,
      createdBy: senderUser._id
    })

    res.send({ success: 1, data: newPost })
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

const updatePost = async (req, res) => {
  try {
    const token = req.headers.authorization
    // console.log(token)
    if (!token) {
      throw new Error('Not found token')
    }

    const jwtToken = token.split(' ')[1] // 'bearer token'

    const data = jwt.verify(jwtToken, process.env.SECRET_KEY)

    const { userId } = data
    if (!userId) {
      throw new Error('Not author')
    }

    const existedUser = await UserModel.findById(userId)

    if (!existedUser) {
      throw new Error('Not author')
    }

    const { postId } = req.params

    const foundPost = await PostModel.findById(postId)

    const isAuthor = userId === foundPost.createdBy.toString()

    if (!isAuthor) {
      throw new Error('Not author')
    }

    const dataUpdatePost = req.body

    const updatedPost = await PostModel.findByIdAndUpdate(postId, dataUpdatePost, { new: true })

    res.send({ success: 1, data: updatedPost })
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params
    const deletedPost = await PostModel.findByIdAndDelete(postId)
    res.send({ success: 1, data: deletedPost})
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost
}