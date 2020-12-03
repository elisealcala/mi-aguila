import React, { useState } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import Button from '../components/button'

const Schema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Usuario requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .matches(
      /^((?=.*[A-Z])(?=.*\d).{7,})$/,
      "Debe contener mínimo 7 caracteres, una letra mayúscula y un número"
    )
});

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  margin: 30px auto;

  & > h2 {
    margin-bottom: 60px;
  }

  & form {
    & div {
      width: 400px;
      position: relative;
    }
  }
`

const StyledInput = styled.input`
  border-width: 1px;
  border-color: #DFE0EB;
  border-style: solid;
  width: 100%;
  font-weight: 300;
  font-family: Montserrat;
  margin-bottom: 40px;
  padding: 14px;
  box-sizing: border-box;

  &:focus {
    border-width: 1px;
    border-color: #DFE0EB;
    outline: none;
  }
`

const Error = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  left: 0;
  height: 20px;
  color: red;
`

type LoginPageProps = {
  baseApiUrl: any;
  profile: string;
}

const LoginScreen = ({ baseApiUrl, profile }: LoginPageProps) => {
  const [loading, setLoading] = useState(false)

  const [stateMessage, setStateMessage] = useState({})

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true)

      const loginApi: Response = await fetch(`${baseApiUrl}/auth`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      }).catch<Response>((error) => {
        console.error(error)
        throw error;
      })

      const result = await loginApi.json()

      if (result.success && result.token) {
        Cookies.set('token', result.token);

        Router.push('/inicio')
      } else {
        setStateMessage(result)
      }

      setLoading(false)
    }
  })

  return (
    <Container>
      <h2>Ingresar</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <StyledInput
            placeholder="Usuario"
            type="email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <Error>{formik.errors.email}</Error>
          )}
        </div>
        <div>
          <StyledInput
            placeholder="Contraseña"
            type="password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <Error>{formik.errors.password}</Error>
          )}
        </div>
        <Button disabled={loading} label="Ingresar" type="submit" />
      </form>
    </Container>
  )
}

export default LoginScreen;