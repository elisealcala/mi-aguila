import React from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  display:  flex;
  justify-content: space-between;
  width: '100%';
  padding: 37px 32px;
  & h2 {
    color: #27415D;
    font-weight: bold;
    margin: 0%;
    text-transform: capitalize;
  }
`

const Notification = styled.div`
  display: flex;
  align-items: center;
  & .notification {
    position: relative;
    padding: 0 25px;
    border-right: 1px solid #DFE0EB
  }
  & .user {
    margin-left:  25px;
  }
`

const Counter = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  background-color: #3751FF;
  top: 0;
  right: 20px;
`

type NavBarProps = {
  page: string
}

const NavBar = () => {
  const { pathname } = useRouter()

  return (
    <Container>
      <h2>{pathname.replace('/', '')}</h2>
      <Notification>
        <FontAwesomeIcon icon={faSearch} size='lg' />
        <div className="notification">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <Counter>{'0'}
          </Counter>
        </div>
        <div className="user">
          <span>Jones Ferdinand</span>
        </div>
      </Notification>
    </Container>
  )
}

export default NavBar