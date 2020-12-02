import React from 'react'
import styled from 'styled-components'
import NavBar from '../components/navbar'
import SideBar from '../components/sidebar'


const Container = styled.div`
  display: flex;
  font-family: 'Montserrat';
`

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <SideBar />
      <div style={{ width: '100%' }}>
        <NavBar />
        {children}
      </div>
    </Container>
  )
}

export default MainLayout