import { UserDTO } from '../models/user.model'

export const requestRegistration = async (
    loadingCallback: (isLoading: boolean) => void,
    payload: Partial<UserDTO> = {}
) => {
    try {
        loadingCallback(true)
        let res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        const resJson = await res.json()
        loadingCallback(false)

        if (!res.ok) {
            return {
                error: resJson.error,
                success: false,
            }
        }

        return {
            error: resJson.error,
            success: true,
        }
    } catch (error) {
        loadingCallback(false)
        return {
            error: JSON.stringify(error),
            success: false,
        }
    }
}
