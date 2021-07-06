import dotenv from 'dotenv';
import React from "react"
import {ApolloProvider} from "@apollo/client"
import { createApolloClient } from './apollo_client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import App from "../App.js"
dotenv.config();

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL;

// GraphQL WebSocket (subscriptions) URL.
// If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL;
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
    : API_URL.replace('https://', 'ws://').replace('https://', 'ws://')




// Create a Apollo client
const apolloClient = createApolloClient(API_URL, websocketApiUrl);



export default(
   <ApolloProvider client = {apolloClient}>
        <ApolloHooksProvider client = {apolloClient}>
              <App/>
      </ApolloHooksProvider>
   </ApolloProvider>
)