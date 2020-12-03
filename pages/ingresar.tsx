import React from 'react'
import { NextPageContext } from 'next'
import AppLayout from '../src/layout/app'
import LoginScreen from '../src/screens/login'
import { absoluteUrl, getAppCookies, verifyToken } from '../src/middlewares/utils'


type LoginPageProps = {
  baseApiUrl: any;
  profile: string;
}

const LoginPage = (props: LoginPageProps) => {
  const { baseApiUrl, profile } = props

  return (
    <LoginScreen baseApiUrl={baseApiUrl} profile={profile} />
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { req } = context

  if (req) {
    const { origin } = absoluteUrl(req)

    const baseApiUrl = `${origin}/api`

    const { token } = getAppCookies(req)

    const profile = token ? verifyToken(token.split(' ')[1]) : ''

    return {
      props: {
        baseApiUrl,
        profile,
      }
    }
  }

}

LoginPage.Layout = AppLayout

export default LoginPage