import { ThemeBase } from '@/themes/themeBase'
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'] })

export const darkTheme: ThemeBase = {
    name: 'dark',
    colors: {
        brand: {
            primary: {
                color: '#331b4e',
                hover: '#331b4e',
                shadow: '#86209d',
            },
            secondary: {
                color: '#57077c',
                hover: '#8632b0',
                shadow: '#bf16f6',
            },
            danger: {
                color: '#00decf',
                hover: '#93fff9',
                shadow: '#6df7ef',
            },
        },
        background: {
            primary: '#17052a',
            secondary: '#1e0936',
            tertiary: '#1e0936',
        },
    },
    font: {
        family: leagueSpartan.style.fontFamily,
        style: 'normal',
        weight: 700,
        colors: {
            primary: '#fade3f',
            secondary: '#fff8ff',
            danger: '#003134',
        },
    },
}
