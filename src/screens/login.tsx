import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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

const LoginScreen = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => console.log(values)
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
        <Button label="Ingresar" type="submit" />
      </form>
    </Container>
  )
}

export default LoginScreen;