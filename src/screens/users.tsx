import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 30px auto;
   
  & > * {
    margin-bottom: 32px;
    border: 1px solid #DFE0EB;
    padding: 14px;
  }
  `

const UserBox = styled.div`
  & > div {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    &:not(:last-child){
      margin-bottom: 16px;
    }
    & span:first-child {
      font-weight: bold;
    }
  }
`

const apiMockUri = 'https://api.mocki.io/v1/008d93a5'

const getData = async () => {
  try {
    const response = await axios.get(
      apiMockUri,
    );
    return response.data;

  } catch (error) {
    return error.response;
  }
}

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: true;
}

const UsersScreen = () => {
  const [data, setData] = useState<User[]>([])

  const [loading, setLoading] = useState(false)

  const populateData = async () => {
    setLoading(true)

    const result: User[] = await getData()

    const firstResult = result.sort((a, b) => {
      if (a.first_name < b.first_name) { return -1; }
      if (a.first_name > b.first_name) { return 1; }
      return 0;
    }).splice(0, 10)

    setData(firstResult)
    setLoading(false)
  }

  useEffect(() => {
    populateData()
  }, [])

  if (loading) {
    return (
      <Container>
        <img
          width="100"
          height="100"
          src={require('../images/loading.gif')}
        />
      </Container>
    )
  }

  return (
    <Container>
      {data.map(user => (
        <UserBox key={user.id}>
          <div>
            <span>Nombre completo</span>
            <span>{`${user.first_name} ${user.last_name}`}</span>
          </div>
          <div>
            <span>Teléfono</span>
            <span>{user.phone}</span>
          </div>
          <div>
            <span>Email</span>
            <span>{user.email}</span>
          </div>
          <div>
            <span>Estado</span>
            <span>{user.status.toString()}</span>
          </div>
        </UserBox>
      ))}
    </Container>
  )
}

export default UsersScreen