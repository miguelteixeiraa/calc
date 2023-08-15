import { MongoMemoryServer } from 'mongodb-memory-server' // testing
import mongoose from 'mongoose'

export const databaseConnectForTesting = async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
}
