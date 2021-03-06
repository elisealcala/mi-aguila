import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { setLogout } from '../middlewares/utils'


const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #363740;
  height: 100vh;
  position: fixed;
  width: 255px;
`

const Logo = styled.div`
  padding: 28px 32px;
  display: flex;
  align-items: center;
  background: #47495B;
  color: #fff;
  & h1 {
    font-weight: bold;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.4px;
    margin: 0 0 0 16px;
  }
`

const Option = styled.div<{ selected?: boolean }>`
  display: flex;
  color: #A4A6B3;
  padding: 20px 30px;
  font-weight: 300;
  cursor: pointer;
  position: relative;
  ${({ selected }) => selected && `
    background: #656872;
    color: #fff;
    &:after {
      position: absolute;
      content: '';
      width: 3px;
      height: 100%;
      background-color: #DDE2FF;
      left: 0;
      top: 0;
    }
  `}
`

const Configuration = styled.div`
  padding: 34px;
  cursor: pointer;
  border-top: 1px solid #DFE0EB;
  color: #A4A6B3;
  margin-top: auto;
`

const menuOptions = [
  {
    label: 'Inicio',
    slug: 'inicio',
    id: 1
  },
  {
    label: 'Usuarios',
    slug: 'usuarios',
    id: 2
  },
  {
    label: 'Tareas',
    slug: 'tareas',
    id: 3
  }
]

const SideBar = () => {
  const router = useRouter()

  const handleClick = (slug: string) => {

    router.push(slug)
  }

  return (
    <SidebarStyled>
      <Logo>
        <img src={require('../images/logo.png')} width="34" height="34" />
        <h1>Mi Águila</h1>
      </Logo>
      {menuOptions.map(option => (
        <Option
          onClick={() => handleClick(option.slug)}
          selected={option.slug === router.pathname.replace('/', '')}
          key={option.id}
        >
          <span>{option.label}</span>
        </Option>
      ))}
      <Configuration onClick={setLogout}>
        <span>Cerrar sesión</span>
      </Configuration>
    </SidebarStyled>
  )
}

export default SideBar