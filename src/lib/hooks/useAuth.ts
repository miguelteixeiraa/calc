import { useEffect, useState } from 'react'
import { UserDTO, UserDVO } from '../models/user.model'

export const useAuth = (payload: Partial<UserDTO> = {}) => {
    const [auth, setAuth] = useState<{
        user: Partial<UserDVO>
        error: string
    }>({
        user: {},
        error: '',
    })

    const authenticateUser = async (payload: UserDTO) => {
        try {
            let res = await fetch('/api/authenticate', {
                method: 'POST',
                body: JSON.stringify(payload || {}),
            })

            if (res.status === 200) {
                setAuth({
                    user: await res.json(),
                    error: '',
                })
            }
        } catch (error) {
            setAuth({
                user: {},
                error: error as string,
            })
        }
    }

    useEffect(() => {
        authenticateUser(payload as UserDTO)
    }, [payload])

    return { auth }
}
