import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --small-devices-font-size: 30px;
    --large-devices-font-size: 32px;
  }

  html {
    height: 100%;
  }

  a {
    all: unset;
    cursor: pointer;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;

    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background.primary};

    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight};
  }

  // Reset 
  * {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
  }

  @media (max-width: 767px) {
    body {
        padding: 0.5rem;
    }
    * {
      font-size: var(--small-devices-font-size);
    }
  }

  @media (min-width: 768px) {
    * {
      font-size: var(--large-devices-font-size);
    }
  }
`
