import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import SideBar from '../components/sidebar'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif
  }
`

const Container = styled.div`
  display: flex;
`

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      <SideBar />
      {children}
    </Container>
  )
}

export default MainLayout