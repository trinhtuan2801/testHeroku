
async function isAdmin(req, res, next) {
  try {
    const senderUser = req.user 
    if (senderUser.role === 'admin') {
      next()
    }
    throw new Error('Only admin can access')

  } catch (err) {
    res.status(401).send({ success: 0, message: err.message })
  }

}

module.exports = isAdmin