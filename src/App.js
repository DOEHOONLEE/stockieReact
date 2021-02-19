import React from 'react'
import { createGlobalStyle } from 'styled-components'
import StockContainer from './comp/StockContainer'
import { GlobalContextProvider } from './GlobalAPI'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: "Gill Sans", sans-serif;
  }
`

function App() {
    return (
        <GlobalContextProvider>
            <GlobalStyle />
            <StockContainer />
        </GlobalContextProvider>
    )
}

export default App
