const mongoose = require('mongoose')
import { logger } from '../helpers/logging'

export const databaseConnect = async (): Promise<void> => {
    mongoose.Promise = global.Promise
    if (mongoose.connection?.readyState === 1) {
        // 0: disconnected
        // 1: connected
        // 2: connecting
        // 3: disconnecting

        console.log('Database already connected!')
        return
    }

    try {
        await mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`)

        logger.info('Successfully connected to the database!')
    } catch (e) {
        logger.error(
            e,
            'It was not possible connecting to the database using the provided connection string'
        )
    }
}
