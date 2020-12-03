import React from 'react'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo-client";
import '../src/css/styles.css'


// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? React.Fragment;

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}