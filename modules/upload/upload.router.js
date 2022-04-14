const express = require('express')
const router = express.Router()
const multer = require('multer')
const uploadController = require('./upload.controller')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const memoryStorage = multer.memoryStorage()
const uploadWithMemoryStorage = multer({storage: memoryStorage})

const upload = multer({storage: storage})

// router.post(
//   '/upload'
// )

router.post(
  '/disk',
  upload.single('file'), //<- key postman gui len la file
  uploadController.uploadToDisk
)

router.post(
  '/cloud',
  uploadWithMemoryStorage.single('file'),
  uploadController.uploadToCloud
)

module.exports = router