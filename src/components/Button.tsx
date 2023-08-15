import styled, { css } from 'styled-components'

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger'
}

export const Button = styled.button<ButtonProps>`
    ${({ theme, variant }) => {
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

            border-radius: 0.3rem;
        `
    }};
`
