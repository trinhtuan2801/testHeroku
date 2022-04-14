const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const uploadToDisk = (req, res) => {
  console.log(req.file)
  res.send({ success: 1, data: req.file.originalname })
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUD_SECRET,
  secure: true
})

const uploadToCloud = async (req, res) => {
  const streamUpload = (req) => {
    return new Promise((res, rej) => {
      let stream = cloudinary.uploader.upload_stream(
        (err, result) => {
          if (result) {
            res(result)
          } else {
            rej(err)
          }
        }
      )

      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }

  const result = await streamUpload(req)
  res.send({ success: 1, data: result })
}

module.exports = {
  uploadToDisk,
  uploadToCloud
}