import { describe, it, expect } from 'vitest'
import { evaluateExpression } from '../calc'

describe('evaluateExpression', () => {
    it('should return an error when the math expression is invalid 1', () => {
        expect(() => evaluateExpression('///')).toThrow()
    })
    it('should return an error when the math expression is invalid 2', () => {
        expect(() => evaluateExpression('ABCABC')).toThrow()
    })
    it('should return nothing when the expression is empty', () => {
        expect(evaluateExpression('')).toBeUndefined()
    })
    it('should do PEMDAS', () => {
        expect(evaluateExpression('2*(1+1)/4*(1+1)+3')).toBe(5)
    })
    it('should have modulus op', () => {
        expect(evaluateExpression('11%2')).toBe(1)
    })
    it('should have percent operations', () => {
        expect(evaluateExpression('10+10%')).toBe(11)
    })
})
