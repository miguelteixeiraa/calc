import { Button } from '../components/Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        variant: 'danger',
        children: '7',
    },
}
