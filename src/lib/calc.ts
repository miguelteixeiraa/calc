import { evaluate } from 'mathjs'

export const evaluateExpression = (expression: string) => {
    return evaluate(expression)
}
