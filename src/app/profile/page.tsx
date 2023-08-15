'use client'

import { Button } from '@/components/Button'
import { userDataAtom } from '@/lib/state/store'
import { useAtom } from 'jotai'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import styled from 'styled-components'

export default function Profile() {
    const [userData, setUserData] = useAtom(userDataAtom)

    useEffect(() => {
        if (!Object.keys(userData).length) {
            redirect('/')
        }
    }, [userData])

    const handleLogout = () => {
        setUserData({})
    }

    return (
        <StyledProfile className="profile">
            <span className="profile__user">
                Hello {userData.email}! loading...
            </span>
            <Button
                onClick={handleLogout}
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
