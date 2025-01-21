import path from 'path'
import fs from 'fs'
export const useStatic = ({
  dir,
  root = true,
}: {
  dir: string
  root?: boolean
}): { directory: string; url: string } => {
  const pth = path.join(!root ? './src' : '.', dir)
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
  return {
    directory: pth,
    url: `/${dir}`,
  }
}

export default {
  // Your code goes here...
  jwtSecret: process.env.JWT_SECRET || 'your-secret-here',
  dbUrl: process.env.MONGODB_URI || 'mongodb://localhost/pos-cafe',
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: '*',
    credentials: !true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  path: {
    media: 'media',
    public: 'public',
    static: 'static',
  },
}
