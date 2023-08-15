import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../src/styles/globalStyles.css'
import { lightTheme } from '../src/themes/light'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story) => (
            <>
                <ThemeProvider theme={lightTheme}>
                    <GlobalStyle />
                    <Story />
                </ThemeProvider>
            </>
        ),
    ],
}

export default preview
