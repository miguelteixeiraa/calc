import styled from 'styled-components'

import Link from 'next/link'
import { useAtom } from 'jotai'
import { userDataAtom } from '@/lib/state/store'

interface HeaderProps {
    switchTheme: () => void
    icon: React.ReactNode
}

export const Header = ({ switchTheme, icon }: HeaderProps) => {
    const [userData, _] = useAtom(userDataAtom)

    const isLoggedIn = () => {
        return Boolean(Object.keys(userData).length)
    }

    return (
        <StyledHeader>
            <Link href={'/'}>calc</Link>
            <span className="header__themeIcon" onClick={switchTheme}>
                {icon}
            </span>
            <Link
                className="header__auth"
                href={`${isLoggedIn() ? '/profile' : '/login'}`}
            >
                {isLoggedIn() ? 'Profile' : 'Sign in'}
            </Link>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    color: ${({ theme }) => theme.font.colors.primary};

    transition: background-color 180ms ease, color 180ms ease;

    .header {
        &__themeIcon {
            cursor: pointer;
        }
        &__auth {
            font-weight: 100;
            font-size: 0.8rem;
        }
    }
`
