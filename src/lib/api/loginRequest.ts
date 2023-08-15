import { UserDTO, UserDVO } from '../models/user.model'

export const loginRequest = async (
    payload: Partial<UserDTO>
): Promise<UserDVO | undefined> => {
    const res = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    if (res.status === 200) {
        return await res.json()
    }
}
