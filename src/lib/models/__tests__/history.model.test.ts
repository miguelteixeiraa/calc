import { it, describe, assert, beforeAll } from 'vitest'
import { historyModel } from '../history.model'
import { databaseConnectForTesting } from './databaseConnectForTesting'

beforeAll(async () => await databaseConnectForTesting())

const History = historyModel()

describe('historyModel', () => {
    it(
        'should create a History object',
        async () => {
            const rawHistory = {
                expression: 'dummy expression',
                id: 'abc',
            }

            try {
                await History.create(rawHistory)
            } catch (e) {
                assert(false)
            }
        },
        { timeout: 10000 }
    )
    it('should not create history object when expression is less than or equal to 1 character', async () => {
        const rawHistory = {
            expression: 'd',
            id: 'abc',
        }

        try {
            await History.create(rawHistory)
        } catch (e) {
            assert(String(e).includes('Invalid expression'))
        }
    })
})
