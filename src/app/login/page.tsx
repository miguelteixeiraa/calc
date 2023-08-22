'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { redirect, useRouter } from 'next/navigation'
import { UserDTO } from '@/lib/models/user.model'
import { useAuth } from '@/lib/hooks/useAuth'
import { logger } from '@/lib/logging'
import { useRegistration } from '@/lib/hooks/useRegistration'

export default function Login() {
    const [formState, setFormState] = useState({} as Partial<UserDTO>)
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState('')

    const [authPayload, setAuthPayload] = useState<Partial<UserDTO>>({})
    const [registrationPayload, setRegistrationPayload] = useState<
        Partial<UserDTO>
    >({})

    const router = useRouter()
    const { auth } = useAuth(authPayload)
    const { registration } = useRegistration(registrationPayload)

    const validateForm = () => {
        if (!formState.email) {
            setError('Your email address is missing.')
            return
        }
        if (!formState.password) {
            setError('Your password is missing.')
        }
    }

    useEffect(() => {
        if (auth.error.length) {
            setError(auth.error)
            return
        }

        if (Object.entries(auth.user).length) {
            router.refresh()
            redirect('/profile')
        }
    }, [auth, router])

    return (
        <StyledSignIn className={'signIn'}>
            <span className="signIn__title">Sign in / Sign up</span>
            <span className="signIn__form">
                <input
                    value={formState.email}
                    onChange={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setFormState({
                            ...formState,
                            email: event.target.value,
                        })
                    }}
                    placeholder="e-mail"
                    className="signIn__form--input"
                    type="text"
                />
                <input
                    value={formState?.password}
                    onChange={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setFormState({
                            ...formState,
                            password: event.target.value,
                        })
                    }}
                    type={'password'}
                    placeholder="password"
                    className="signIn__form--input"
                />

                <Button
                    onClick={() => {
                        validateForm()
                        setAuthPayload({ ...formState })
                    }}
                    className="signIn__form--submit"
                    variant="secondary"
                >
                    Sign in
                </Button>
                <Button
                    onClick={() => {
                        validateForm()
                        setRegistrationPayload({ ...formState })
                    }}
                    className="signIn__form--submit"
                    variant="primary"
                >
                    {!registration.error.length && registration.success === true
                        ? 'Success'
                        : 'Sign up'}
                </Button>
            </span>
        </StyledSignIn>
    )
}

const StyledSignIn = styled.main`
    width: 100%;
    height: 20rem;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;

    .signIn {
        &__title {
            margin-top: 2.2rem;
            margin-bottom: 0.2rem;
            font-size: 0.8rem;

            color: ${({ theme }) => theme.font.colors.primary};
        }

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;
            &--input {
                background-color: ${({ theme }) =>
                    theme.colors.background.tertiary};

                padding: 1rem;
                margin: 0.3rem;
                font-weight: 400;
                font-size: 0.8rem;

                color: ${({ theme }) => theme.font.colors.primary};
                border-radius: 0.3rem;
                width: 100%;
                height: 1rem;
            }
            &--submit {
                margin: 0.5rem;
                width: 100%;
                font-size: 0.8rem;
                font-weight: 400;
            }
            &--success-message {
                color: ${({ theme }) => theme.font.colors.primary};
            }
            &--error-message {
                color: ${({ theme }) => theme.font.colors.danger};
            }
        }
    }
`
