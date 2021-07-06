import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getMainDefinition } from 'apollo-utilities';



const createAuthLink = () =>  setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      // ...headers,
      Authorization: token ? token : "",
      accept: 'application/json',
    }
  }
});

const HundleRetry = () => new RetryLink();


//* ---------------- Helper functions that handles error cases --------------- */
const handleErrors = () => {
 return onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
   console.log(graphQLErrors)
    graphQLErrors.map(({ message}) =>
      console.log(
        `Graphql Error : ${message}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
}




// Creates a new Apollo Client
/**
 * @param {string} API_URL, GraphQL api url
 * @param {string} websocketApiUrl, GraphQL WebSocket api url
 */

export const createApolloClient = (API_URL, websocketApiUrl) => {
  const cache = new InMemoryCache();


const persist_cache = async () => {
      await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
}




  const errorLink = handleErrors();
  const authLink = createAuthLink();
  const retryLink = HundleRetry();
  const uploadLink = createUploadLink({ uri: API_URL }); // Upload link also creates an HTTP link


//* -------------------------- Create WebSocket link ------------------------- */
const authToken = localStorage.getItem('jwt');
const wsLink = new WebSocketLink({
    uri: websocketApiUrl,
    options: {
      timeout: 60000,
      reconnect: true,
      connectionParams: {
        authorization: authToken,
      },
    },
  });

   //Temporary fix for early websocket closure resulting in websocket connections not being instantiated
  wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

  /* Split links, so we can send data to each link
   depending on what kind of operation is being sent */
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink
  );

  persist_cache();
/* -------------------------------------------------------------------------- */
  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, retryLink, terminatingLink]),
    cache :cache,
  });
}






