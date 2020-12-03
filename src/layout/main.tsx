import React from 'react'
import styled from 'styled-components'
import NavBar from '../components/navbar'
import SideBar from '../components/sidebar'


const Container = styled.div`
  display: flex;
  font-family: 'Montserrat';

  & .container {
    margin-left: 255px;
    width: calc(100% - 255px);
  }
`

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <SideBar />
      <div className="container">
        <NavBar />
        {children}
      </div>
    </Container>
  )
}

export default MainLayout