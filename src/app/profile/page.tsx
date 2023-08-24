'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { userDataAtom } from '@/lib/state/store'
import { requestAuthentication } from '@/lib/requests/authentication.request'
import { useEffect } from 'react'

export default function Profile() {
    const [userData, setUserData] = useAtom(userDataAtom)
    const router = useRouter()

    useEffect(() => {
        requestAuthentication({}).then(async (res) => {
            if (!Object.keys(res.user).length) {
                setUserData({})
            }
        })
    }, [])

    useEffect(() => {
        if (!Object.keys(userData).length) {
            router.push('/login')
        }
    }, [userData])

    return (
        <StyledProfile className="profile">
            <span className="profile__user">{}</span>
            <Button
                onClick={async () => {
                    await fetch('/api/logout')
                    setUserData({})
                }}
                className="profile__logout"
                variant="danger"
            >
                Logout
            </Button>
        </StyledProfile>
    )
}

const StyledProfile = styled.main`
    width: 100%;
    height: 20rem;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;

    .profile {
        &__user {
            color: ${({ theme }) => theme.font.colors.danger};
            margin: 2rem;
            text-align: center;
        }
        &__logout {
            width: 5rem;
            font-size: 0.7rem;
        }
    }
`
