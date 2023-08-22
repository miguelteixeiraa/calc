import * as bcrypt from 'bcrypt'

const saltRounds = 10

export async function passwordHash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, saltRounds)
}

export async function passwordMatch(
    passwordHash: string,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
}
