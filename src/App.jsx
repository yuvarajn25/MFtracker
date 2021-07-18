import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import supabase from "./supabase";
import Header from "./components/Header";

function App(props) {
  const [session, setSession] = useState(supabase.auth.session());

  supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
  });

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <div>
        <Header />
        <Route
          {...rest}
          render={(props) =>
            session ? (
              <div>
                <Component {...props} />
              </div>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </div>
    );
  };

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return session ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route exact path="/login">
            <Login isLogin={true} />
          </Route>
          <Route exact path="/signup">
            <Login isLogin={false} />
          </Route>
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
