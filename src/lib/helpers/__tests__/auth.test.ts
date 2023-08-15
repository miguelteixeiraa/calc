import { describe, it, expect } from 'vitest'
import { passwordHash } from '../auth'

describe('passwordHash', () => {
    it('should encrypt a password', async () => {
        const dummyPass = 'dummyPass'
        const encryptedDummyPass = await passwordHash(dummyPass)

        expect(encryptedDummyPass.length).toBeGreaterThan(0)
        expect(encryptedDummyPass).to.not.be.equal(dummyPass)
    })
})
