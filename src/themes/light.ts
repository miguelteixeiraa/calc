import { ThemeBase } from '@/themes/themeBase'
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'] })

export const lightTheme: ThemeBase = {
    name: 'light',
    colors: {
        brand: {
            primary: {
                color: '#e5e4e1',
                hover: '#ffffff',
                shadow: '#a79c92',
            },
            secondary: {
                color: '#3c8286',
                hover: '#61b5bd',
                shadow: '#1c6167',
            },
            danger: {
                color: '#c85400',
                hover: '#ff8b37',
                shadow: '#8b3b00',
            },
        },
        background: {
            primary: '#e6e6e6',
            secondary: '#d2cecf',
            tertiary: '#eeeeee',
        },
    },
    font: {
        family: leagueSpartan.style.fontFamily,
        style: 'normal',
        weight: 700,
        colors: {
            primary: '#34352f',
            secondary: '#fbffff',
            danger: '#fffffa',
        },
    },
}
