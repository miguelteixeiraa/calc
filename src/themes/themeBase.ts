export interface ThemeBase {
    name: string
    colors: {
        brand: {
            primary: {
                color: string
                hover: string
                shadow: string
            }
            secondary: {
                color: string
                hover: string
                shadow: string
            }
            danger: {
                color: string
                hover: string
                shadow: string
            }
        }
        background: {
            primary: string
            secondary: string
            tertiary: string
        }
    }
    font: {
        family: string
        style: string
        weight: number
        colors: {
            primary: string
            secondary: string
            danger: string
        }
    }
}
