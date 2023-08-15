'use client'

import { useEffect } from 'react'
import { Button } from '@/components/Button'
import { useLoginRequest } from '@/lib/hooks/useLoginRequest'
import { useSignUpRequest } from '@/lib/hooks/useSignUpRequest'
import { useState } from 'react'
import styled from 'styled-components'
import { redirect } from 'next/navigation'
import { UserDTO } from '@/lib/models/user.model'
import { userDataAtom } from '@/lib/state/store'
import { useAtom } from 'jotai'

export default function Login() {
    const [formState, setFormState] = useState({} as Partial<UserDTO>)
    const [userData, setUserData] = useAtom(userDataAtom)
    const [signUpStatus, setSignUpStatus] = useState(false)
    const [errorSignUp, setErrorSignUp] = useState('')

    useEffect(() => {
        if (Object.keys(userData).length) {
            redirect('/profile')
        }
    }, [userData])

    const handleLogin = async () => {
        const user = await useLoginRequest(formState)
        if (!user) {
            console.log('not found')
        } else {
            setUserData(user)
        }
    }
    const handleSignUp = async () => {
        try {
            await useSignUpRequest(formState)
            setSignUpStatus(true)
        } catch (e) {
            setErrorSignUp(e as string)
        }
    }

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
                    onClick={handleLogin}
                    className="signIn__form--submit"
                    variant="secondary"
                >
                    Sign in
                </Button>
                <Button
                    onClick={!signUpStatus ? handleSignUp : () => {}}
                    className="signIn__form--submit"
                    variant="primary"
                >
                    {signUpStatus ? 'Success' : 'Sign up'}
                </Button>
                {errorSignUp && (
                    <span signIn__form--error-message>{errorSignUp}</span>
                )}
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
