import 'styled-components'
import { ThemeBase } from './themeBase'

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeBase {}
}
