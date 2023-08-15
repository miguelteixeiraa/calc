'use client'

import { useAtom } from 'jotai'
import { darkModeAtom, userDataAtom } from '@/lib/state/store'

import styled, { StyleSheetManager, ThemeProvider } from 'styled-components'
import { SunIcon, MoonIcon } from '@primer/octicons-react'

import { StyledComponentsRegistry } from '@/lib/helpers/styledRegistry'
import { GlobalStyle } from '@/styles/globalStyles.css'
import { lightTheme } from '@/themes/light'
import { darkTheme } from '@/themes/dark'
import { Header } from '@/components/Header'

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [userData, setUserData] = useAtom(userDataAtom)

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
        <QueryClientProvider client={queryClient}>
            <StyledComponentsRegistry>
                <StyleSheetManager shouldForwardProp={() => true}>
                    <ThemeProvider theme={themeTokens.theme}>
                        <>
                            <GlobalStyle />
                        </>
                        <html lang="en">
                            <body>
                                <StyledLayout>
                                    <Header
                                        switchTheme={() => {
                                            setDarkMode(!darkMode)
                                        }}
                                        icon={themeTokens.icon}
                                    />
                                    {children}
                                </StyledLayout>
                            </body>
                        </html>
                    </ThemeProvider>
                </StyleSheetManager>
            </StyledComponentsRegistry>
        </QueryClientProvider>
    )
}

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    height: 100%;
    width: 16.8rem;
    max-width: 100%;
`
