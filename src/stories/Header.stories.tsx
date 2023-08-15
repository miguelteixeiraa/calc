import { MoonIcon, SunIcon } from '@primer/octicons-react'
import { ThemeProvider } from 'styled-components'
import { useAtom } from 'jotai'
import { darkModeAtom } from '../lib/state/store'

import { darkTheme } from '../themes/dark'
import { lightTheme } from '../themes/light'

import { Header } from '../components/Header'
import { Meta, StoryObj } from '@storybook/react'

const HeaderStory = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    const themeTokens = darkMode
        ? {
              icon: <MoonIcon size={'medium'} />,
              theme: darkTheme,
          }
        : {
              icon: <SunIcon size={'medium'} />,
              theme: lightTheme,
          }

    return (
        <ThemeProvider theme={themeTokens.theme}>
            <div style={{ width: '500px' }}>
                <Header
                    switchTheme={() => {
                        setDarkMode(!darkMode)
                    }}
                    icon={themeTokens.icon}
                />
            </div>
        </ThemeProvider>
    )
}

const meta: Meta<typeof HeaderStory> = {
    title: 'components/Header',
    component: HeaderStory,
}

export default meta
type Story = StoryObj<typeof HeaderStory>

export const Primary: Story = {
    args: {},
}
