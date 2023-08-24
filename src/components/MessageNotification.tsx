import styled from 'styled-components'

interface MessageNotificationProps {
    variant: 'success' | 'error'
}

export const MessageNotification = styled.span<MessageNotificationProps>`
    background-color: ${({ variant }) =>
        variant === 'success' ? '#90EE90' : '#EC5800'};
    width: fit-content;
    height: fit-content;
    font-size: 0.8rem;
    font-weight: 400;
    padding: 0.3rem;
    position: fixed;
`
