'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { useAuth } from '@/lib/hooks/useAuth'
import { logger } from '@/lib/logging'
import { UserDVO } from '@/lib/models/user.model'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { redirect } from 'next/navigation'
import styled from 'styled-components'

export default function Profile() {
    const router = useRouter()
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    useEffect(() => {
        if (isLoggedOut) {
            router.refresh()
            redirect('/')
        }
    }, [isLoggedOut, router])

    return (
        <StyledProfile className="profile">
            <span className="profile__user">Hello</span>
            <Button
                onClick={async () => {
                    await fetch('/api/logout')
                    setIsLoggedOut(true)
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
