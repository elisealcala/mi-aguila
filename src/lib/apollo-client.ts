import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from 
"@apollo/client";

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: 'https://mi-aguila-challenge.hasura.app/v1/graphql',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: Record<string, unknown> | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: Record<string, unknown> | null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}