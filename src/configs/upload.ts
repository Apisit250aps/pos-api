import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import config from '../config'
import { console } from 'inspector'

const media = (location: string) => {
  const pth = path.join(config.path.media, location)
  fs.access(pth, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(pth, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory:', err)
        } else {
          console.log('Directory created successfully:', pth)
        }
      })
    }
  })

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pth)
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const hash = crypto.createHash('sha256')
      const uniqueName = hash
        .update(`${Date.now()}-${file.originalname}`)
        .digest('hex') // สร้าง hash จากเวลา + ชื่อไฟล์
      cb(null, `${uniqueName}${ext}`)
    },
  })
  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG are allowed.'))
      }
    },
  })
}

export { media }
