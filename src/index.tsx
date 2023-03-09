import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Apollo client config
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiNjQ3ODEyZjgyMzIwIiwicHJvamVjdElkIjoiYmZkMDYzNDMtMWJjNS00NmQ2LTgzNjItMzU2N2ViYjU3ODgwIiwiZnVsbE5hbWUiOiJNYXJpZWxhIGRlIEplc8O6cyBSaXZhcyBIZXJuw6FuZGV6IiwiZW1haWwiOiJtYXJpZWxhLnJpdmFzLmhkekBnbWFpbC5jb20iLCJpYXQiOjE2Nzc3ODI1MjR9.dhkZC1ok1vSDcfTLD3hInS0GH_w1O5QwgnFYvyXGfr8'

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});


const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
