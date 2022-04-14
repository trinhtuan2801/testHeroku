//định danh được người dùng
//ko phải user -> trả luôn kq

const res = require("express/lib/response")
const UserModel = require('../modules/auth/user')
const jwt = require('jsonwebtoken')
// user -> next()
async function needAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization

    if (!token) {
      throw new Error('Not found token')
    }

    const jwtToken = token.split(' ')[1] // 'bearer token'

    const data = jwt.verify(jwtToken, process.env.SECRET_KEY)

    const { userId } = data
    if (!userId) {
      throw new Error('Authorization fail')
    }

    const existedUser = await UserModel.findById(userId)

    if (!existedUser) {
      throw new Error('Authorization fail')
    }

    //nhét thêm thông tin vào request
    req.user = existedUser

    next()

  } catch (err) {
    res.status(401).send({success: 0, message: err.message})
  }
  
}

module.exports = needAuthenticated