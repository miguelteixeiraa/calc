import { historyModel } from '../models/history.model'
import { nanoid } from 'nanoid'
import { User, UserDVO, UserDTO, userModel } from '../models/user.model'
import { logger } from '../helpers/logging'

const UserModel = userModel()
const HistoryModel = historyModel()

export const createUser = async (
    userDTO: UserDTO
): Promise<User | undefined> => {
    try {
        const newHistoryId = nanoid()
        const newUserData = {
            ...userDTO,
            historyId: newHistoryId,
        }
        const newHistoryData = {
            id: newHistoryId,
            expression: 'Hello calc! :)',
        }

        const newUser = new UserModel(newUserData)
        const newHistory = new HistoryModel(newHistoryData)

        await newHistory.save()
        const savedUser = await newUser.save()

        return savedUser.toObject()
    } catch (error) {
        logger.error(`Unable to create User: ${error}`)
        throw error
    }
}

export const isValidUser = (user: UserDTO): boolean => {
    const newUserData = {
        ...user,
        historyId: 'dummy',
    }
    try {
        new UserModel(newUserData)
        return true
    } catch (_e) {
        return false
    }
}

export const getUser = async (email: string): Promise<User | undefined> => {
    const user = await UserModel.findOne({ email }).exec()
    return user?.toObject()
}

export const addToUserHistory = async (newHistoryObj: History) => {
    const history = new HistoryModel(newHistoryObj)
    await history.save()
}

export const getUserHistory = async (user: User): Promise<History[]> => {
    try {
        const historyDocuments = await HistoryModel.find({
            id: user.historyId,
        }).exec()

        const history: History[] = historyDocuments.map((document) =>
            document.toObject()
        )

        return history
    } catch (error) {
        logger.error(`Error fetching user history: ${error}`)
        throw error
    }
}

export const toUserDVO = (user: User): UserDVO => {
    const { password, ...userDVO } = user
    return userDVO
}
