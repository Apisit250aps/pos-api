export default {
  // Your code goes here...
  jwtSecret: process.env.JWT_SECRET || 'your-secret-here',
  dbUrl: process.env.MONGODB_URI || 'mongodb://localhost/pos-cafe',
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
  },
}
