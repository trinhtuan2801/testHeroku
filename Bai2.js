const jwt = require('jsonwebtoken')
jwt.sign({
  username: 'web@gmail.com'
}, 'webfullstack', {
  expiresIn: '3d'
})