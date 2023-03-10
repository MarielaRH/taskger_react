import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { Container } from "./layout/Container/Container";
import { MyTasksPage } from "./pages/MyTasksPage/MyTasksPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";

import { useMemo } from "react";

// Apollo client config
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiNjQ3ODEyZjgyMzIwIiwicHJvamVjdElkIjoiYmZkMDYzNDMtMWJjNS00NmQ2LTgzNjItMzU2N2ViYjU3ODgwIiwiZnVsbE5hbWUiOiJNYXJpZWxhIGRlIEplc8O6cyBSaXZhcyBIZXJuw6FuZGV6IiwiZW1haWwiOiJtYXJpZWxhLnJpdmFzLmhkekBnbWFpbC5jb20iLCJpYXQiOjE2Nzc3ODI1MjR9.dhkZC1ok1vSDcfTLD3hInS0GH_w1O5QwgnFYvyXGfr8";

const httpLink = createHttpLink({
  uri: "https://syn-api-prod.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            tasks: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
};


function App() {
  const client = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ErrorBoundary>
          <Container>
            <Routes>
              <Route path="/"  element={<DashboardPage />}></Route>
              <Route path="/taskger" element={<DashboardPage />}></Route>
              <Route path="/mytasks" element={<MyTasksPage />}></Route>
              <Route path="/settings" element={<ProfilePage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </Container>
        </ErrorBoundary>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
