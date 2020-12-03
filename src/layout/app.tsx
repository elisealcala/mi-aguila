import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  font-family: 'Montserrat';
  width: 800px;
  margin: 30px auto;
`

const AppLayout: React.FC = ({ children }) => {
  return (
    <Container>{children}</Container>
  )
}

export default AppLayout