import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo-client";
import '../src/css/styles.css'

// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  const [showMessage, setShowMessage] = useState(false)

  const Layout = Component.Layout ?? React.Fragment;

  const apolloClient = useApollo(pageProps.initialApolloState);

  const token = Cookies.get('token')

  useEffect(() => {
    if (token) {
      if (!showMessage) {
        const timer = setTimeout(() => {
          setShowMessage(true)
        }, 240000);
        return () => clearTimeout(timer);
      }
    }
  }, [showMessage, token])


  return (
    <ApolloProvider client={apolloClient}>
      <Layout hideMessage={() => setShowMessage(false)} showMessage={showMessage}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
