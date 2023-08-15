import { UserDTO } from '../models/user.model'

export const signUpRequest = async (payload: Partial<UserDTO>) => {
    const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    if (res.status === 200) {
        return res.body
    }
}
