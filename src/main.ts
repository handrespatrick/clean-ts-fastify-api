import app from '@/main/config/app'
import env from '@/main/config/env'

import { postgres } from './infra/db/client/postgres-client'

const main = async () => {
  try {
    await postgres.connect()
    app.listen({ port: env.port, host: '0.0.0.0' }, () => console.log(`Server is running on port ${env.port}`))
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

main()
