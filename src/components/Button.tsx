import styled, { css } from 'styled-components'

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger'
    isLoading?: boolean
}

export const Button = styled.button<ButtonProps>`
    ${({ theme, variant, isLoading }) => {
        const backgroundColorTheme =
            variant === 'primary'
                ? theme.colors.brand.primary
                : variant === 'secondary'
                ? theme.colors.brand.secondary
                : variant === 'danger'
                ? theme.colors.brand.danger
                : null

        if (!backgroundColorTheme) {
            return ''
        }

        const { color, shadow, hover } = backgroundColorTheme

        return css`
            background-color: ${color};
            max-width: 20rem;
            min-width: 2rem;
            height: 2rem;

            box-shadow: 0rem 0.15rem ${shadow};

            transition: 200ms;
            cursor: pointer;

            font-weight: 900;
            color: ${theme.font.colors[variant]};

            &:hover {
                background-color: ${hover};
            }

            &:active {
                box-shadow: 0rem 0.1rem ${shadow};
                transform: translateY(0.05rem);
            }

            &:disabled {
                background-color: ${shadow};
            }

            border-radius: 0.3rem;
            position: relative;
            overflow: hidden;
            z-index: 1;

            &:before {
                display: ${isLoading ? 'block' : 'none'};
                content: '';
                position: absolute;
                top: 0;
                z-index: -1;
                left: 0;
                width: 0;
                height: 100%;
                background-color: ${shadow};
                animation: loadingAnimation 2s linear infinite;
            }

            @keyframes loadingAnimation {
                0% {
                    width: 0;
                }
                100% {
                    width: 100%;
                }
            }
        `
    }};
`
