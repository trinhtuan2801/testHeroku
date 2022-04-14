const UserModel = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const existedUser = await UserModel.findOne({ username: username })

    if (existedUser) {
      throw new Error('Username duplicate')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await UserModel.create({
      username,
      password: hashPassword
    })

    //hydrate document -> khi stringify mat di cac property linh tinh
    const cloneNewUser = JSON.parse(JSON.stringify(newUser))

    res.send({
      success: 1,
      data: {
        ...cloneNewUser
      }
    })
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const existedUser = await UserModel.findOne({ username })

    if (!existedUser) {
      throw new Error('Wrong username or password')
    }

    const matchedPassword = await bcrypt.compare(password, existedUser.password)

    if (!matchedPassword) {
      throw new Error('Wrong username or password')
    }

    const userId = existedUser._id
    //token
    //header: định danh thuật toán 
    //payload: thông tin mã hóa -> base64 (vẫn có thể giải mã)
    //signature: sha256(header + payload)
    //2 key: public key, private key (ở trên server)
    const token = jwt.sign({
      userId, //payload
    }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 7
    })

    res.send({
      success: 1,
      data: {
        _id: userId,
        token
      }
    })
  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

module.exports = {
  register,
  login
}