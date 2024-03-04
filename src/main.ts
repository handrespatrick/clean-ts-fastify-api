import app from '@/main/config/app'
import env from '@/main/config/env'

app.listen({ port: env.port }, () => console.log(`Server is running on port ${env.port}`))
