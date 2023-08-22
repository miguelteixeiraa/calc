import { useEffect, useState } from 'react'
import { UserDTO } from '../models/user.model'

export const useRegistration = (payload: Partial<UserDTO> = {}) => {
    const [registration, setRegistration] = useState<{
        error: string
        success: boolean | null
    }>({
        error: '',
        success: null,
    })

    const registerUser = async (payload: UserDTO) => {
        try {
            let res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(payload || {}),
            })

            if (res.status === 201) {
                setRegistration({ success: true, error: '' })
            }
        } catch (error) {
            setRegistration({ error: error as string, success: false })
        }
    }

    useEffect(() => {
        if (payload.email && payload.password) {
            registerUser(payload as UserDTO)
        }
    }, [payload])

    return { registration }
}
