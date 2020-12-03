import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  margin: 30px auto;
`

const HomeScreen = () => {

  return (
    <Container>
      <img
        src={require('../images/illustration.png')}
      />
    </Container>
  )
}

export default HomeScreen