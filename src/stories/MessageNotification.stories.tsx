import { MessageNotification } from '../components/MessageNotification'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MessageNotification> = {
    title: 'components/MessageNotification',
    component: MessageNotification,
}

export default meta
type Story = StoryObj<typeof MessageNotification>

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Your account was successfully created!',
    },
}

export const Error: Story = {
    args: {
        variant: 'error',
        children: 'An error message',
    },
}
