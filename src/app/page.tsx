'use client'

import { useState } from 'react'

import { useAtom } from 'jotai'
import { calcHistoryAtom } from '@/lib/state/store'

import { Button } from '@/components/Button'
import { evaluateExpression } from '@/lib/calc'

import styled from 'styled-components'

export default function Calc() {
    const [display, setDisplay] = useState('')

    const handleDisplayChange = (exp: string) => {
        setDisplay(exp)
    }

    const handleCalcKeyPressed = (char: string) => {
        setDisplay(display + char)
    }

    const handleDelKeyPressed = () => {
        setDisplay(display.slice(0, -1))
    }

    const handleResetClick = () => {
        setDisplay('')
    }

    const handleEqualClick = () => {
        if (!display) return
        try {
            setDisplay(`${evaluateExpression(display)}`)
        } catch (e) {
            setDisplay('Error')
        }
    }

    return (
        <StyledCalc className="calc">
            <input
                value={display}
                onChange={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    handleDisplayChange(event.target.value)
                }}
                type="text"
                className="calc__display"
            />
            <div className="calc__actions">
                <Button
                    onClick={() => handleCalcKeyPressed('7')}
                    variant={'primary'}
                >
                    7
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('8')}
                    variant={'primary'}
                >
                    8
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('9')}
                    variant={'primary'}
                >
                    9
                </Button>
                <Button
                    onClick={() => handleDelKeyPressed()}
                    className="calc__actions--del"
                    variant={'secondary'}
                >
                    DEL
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('4')}
                    variant={'primary'}
                >
                    4
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('5')}
                    variant={'primary'}
                >
                    5
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('6')}
                    variant={'primary'}
                >
                    6
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('+')}
                    variant={'primary'}
                >
                    +
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('1')}
                    variant={'primary'}
                >
                    1
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('2')}
                    variant={'primary'}
                >
                    2
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('3')}
                    variant={'primary'}
                >
                    3
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('-')}
                    variant={'primary'}
                >
                    -
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('.')}
                    variant={'primary'}
                >
                    .
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('0')}
                    variant={'primary'}
                >
                    0
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('/')}
                    variant={'primary'}
                >
                    /
                </Button>
                <Button
                    onClick={() => handleCalcKeyPressed('*')}
                    variant={'primary'}
                >
                    x
                </Button>
                <Button
                    onClick={() => handleResetClick()}
                    className="calc__actions--reset"
                    variant={'secondary'}
                >
                    RESET
                </Button>
                <Button
                    onClick={() => handleEqualClick()}
                    className="calc__actions--equal"
                    variant={'danger'}
                >
                    =
                </Button>
            </div>
        </StyledCalc>
    )
}

const StyledCalc = styled.main`
    width: 100%;
    height: 20rem;
    max-height: 100%;

    .calc {
        &__display {
            background-color: ${({ theme }) =>
                theme.colors.background.tertiary};

            padding: 1rem;
            text-align: right;
            font-weight: 900;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.font.colors.primary};
            border-radius: 0.3rem;
            width: 100%;

            @media (max-width: 767px) {
                height: 4rem;
            }
            @media (min-width: 768px) {
                height: 4.8rem;
            }
        }
        &__actions {
            padding: 0.75rem;
            margin-top: 0.7rem;
            border-radius: 0.3rem;

            background-color: ${({ theme }) =>
                theme.colors.background.secondary};

            display: grid;
            grid-template-columns: repeat(4, 1fr);

            &--reset {
                font-size: 0.7rem;
                grid-column: 1 / span 2;
                width: 100%;
            }
            &--equal {
                font-size: 0.8rem;
                grid-column: 3 / span 2;
                width: 100%;
            }
            &--del {
                font-size: 0.7rem;
            }

            @media (max-width: 767px) {
                grid-column-gap: 0.4rem;
                grid-row-gap: 0.4rem;
            }
            @media (min-width: 768px) {
                grid-column-gap: 0.7rem;
                grid-row-gap: 0.7rem;
            }
        }
    }
`
