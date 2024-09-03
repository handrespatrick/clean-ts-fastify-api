export default {
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'teste',
  salt: parseInt(process.env.SALT || '12', 10)
}
