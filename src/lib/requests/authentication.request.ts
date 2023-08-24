import { UserDTO, UserDVO } from '../models/user.model'

export const requestAuthentication = async (
    payload: Partial<UserDTO> = {}
): Promise<{
    error: string
    user: Partial<UserDVO>
}> => {
    try {
        let res = await fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(payload || {}),
        })
        const resJson = await res.json()
        if (!res.ok) {
            return {
                user: {} as Partial<UserDVO>,
                error: resJson.error,
            }
        }

        return {
            user: { ...resJson } as Partial<UserDVO>,
            error: '',
        }
    } catch (error) {
        return {
            user: {} as Partial<UserDVO>,
            error: JSON.stringify(error),
        }
    }
}
