import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo-client";
import '../src/css/styles.css'
import { setLogout, verifyToken } from '../src/middlewares/utils';


// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  const [showMessage, setShowMessage] = useState(false)

  const Layout = Component.Layout ?? React.Fragment;

  const apolloClient = useApollo(pageProps.initialApolloState);

  const token = Cookies.get('token')

  const profile = token ? verifyToken(token.split(' ')[1]) : ''

  useEffect(() => {
    if (!profile) {
      setLogout()
    }

    if (profile && !showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(true)
      }, 240000);
      return () => clearTimeout(timer);
    }
  }, [profile, showMessage])


  return (
    <ApolloProvider client={apolloClient}>
      <Layout hideMessage={() => setShowMessage(false)} showMessage={showMessage}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}