'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { redirect, useRouter } from 'next/navigation'
import { UserDTO } from '@/lib/models/user.model'
import { logger } from '@/lib/logging'
import { MessageNotification } from '@/components/MessageNotification'
import emailValidator from 'email-validator'
import { useAtom } from 'jotai'
import { userDataAtom } from '@/lib/state/store'
import { requestAuthentication } from '@/lib/requests/authentication.request'
import { requestRegistration } from '@/lib/requests/registration.request'

export default function Login() {
    const [formState, setFormState] = useState({} as Partial<UserDTO>)
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState('')
    const [_, setUserData] = useAtom(userDataAtom)
    const router = useRouter()

    const [register, setRegister] = useState<{
        data?: {
            success?: boolean
            error?: string
        }
        loading?: boolean
    }>({ data: {}, loading: false })

    const isValidForm = (): boolean => {
        if (
            !formState.email?.length ||
            !emailValidator.validate(formState.email)
        ) {
            setError('Your email address is missing or invalid.')
            return false
        }
        if (!formState.password?.length) {
            setError('Your password is missing.')
            return false
        }

        return true
    }

    const handleAuth = async () => {
        const auth = await requestAuthentication({ ...formState })
        if (auth.error?.length && !Object.keys(auth.user)) {
            setError(auth.error)
            return
        }
        if (Object.keys(auth.user).length) {
            setUserData({ ...auth.user })
            router.push('/profile')
        }
    }

    const handleRegistration = async () => {
        const registration = await requestRegistration(
            (loading) => {
                setRegister({
                    ...register,
                    loading,
                })
            },
            { ...formState }
        )

        if (registration.error?.length && !registration.success) {
            setError(registration.error)
            return
        } else if (registration.success) {
            setRegister({ ...register, data: { ...registration } })
            setMessage('User successfully created.')
        }
    }

    const rewindNotifications = () => {
        setError('')
        setMessage('')
    }

    return (
        <StyledSignIn className={'signIn'}>
            {message && (
                <MessageNotification variant="success">
                    {message}
                </MessageNotification>
            )}
            {error && (
                <MessageNotification variant="error">
                    {error}
                </MessageNotification>
            )}
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
                    variant="secondary"
                    onClick={() => {
                        if (isValidForm()) {
                            rewindNotifications()
                            handleAuth()
                        }
                    }}
                    className="signIn__form--submit"
                >
                    Sign in
                </Button>
                <Button
                    variant="primary"
                    isLoading={register.loading}
                    disabled={register.data?.success}
                    onClick={() => {
                        if (isValidForm()) {
                            rewindNotifications()
                            handleRegistration()
                        }
                    }}
                    className="signIn__form--submit"
                >
                    Sign up
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
