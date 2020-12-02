import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo-client";
import MainLayout from '../src/layout/main'
import '../src/css/styles.css'


// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  )
}