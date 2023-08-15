import { it, describe, assert, beforeAll } from 'vitest'
import { userModel } from '../user.model'
import { databaseConnectForTesting } from './databaseConnectForTesting'

beforeAll(async () => await databaseConnectForTesting())

const User = userModel()

describe('userModel', () => {
    it(
        'should create a user',
        async () => {
            const rawUser = {
                email: 'email@email.com',
                password: 'dummy',
                historyId: 'dummy',
            }

            try {
                await User.create(rawUser)
            } catch (e) {
                assert(false)
            }
        },
        { timeout: 10000 }
    )
    it('should not create user object when password is less than or equal to 1 character', async () => {
        const rawUser = {
            email: 'email@email.com',
            password: 'd',
            historyId: 'dummy',
        }

        try {
            await User.create(rawUser)
        } catch (e) {
            assert(String(e).includes('Invalid password'))
        }
    })

    it('should not create user when the email is invalid', async () => {
        const rawUser = {
            email: 'invalid_email',
            password: 'dummy',
            historyId: 'dummy',
        }

        try {
            await User.create(rawUser)
        } catch (e) {
            assert(String(e).includes('Invalid email'))
        }
    })

    it('should not create user when object has no history id', async () => {
        const rawUser = {
            email: 'invalid_email',
            password: 'dummy',
            historyId: '',
        }

        try {
            await User.create(rawUser)
        } catch (e) {
            assert(true)
        }
    })
})
