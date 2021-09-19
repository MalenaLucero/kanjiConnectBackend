import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        mongo: {
            dbName: process.env.MONGO_DB,
            user: process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD,
            host: process.env.MONGO_HOST,
            apiKey: process.env.API_KEY
        },
        jwtSecret: process.env.JWT_SECRET
    }
})