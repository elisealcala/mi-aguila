import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo-client";
import '../src/css/styles.css'
import { setLogout } from '../src/middlewares/utils';


// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  const [showMessage, setShowMessage] = useState(false)

  const Layout = Component.Layout ?? React.Fragment;

  const apolloClient = useApollo(pageProps.initialApolloState);

  const token = Cookies.get('token')

  useEffect(() => {
    if (!token) {
      setLogout()
    }

    if (token && !showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(true)
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [token, showMessage])


  return (
    <ApolloProvider client={apolloClient}>
      <Layout hideMessage={() => setShowMessage(false)} showMessage={showMessage}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}