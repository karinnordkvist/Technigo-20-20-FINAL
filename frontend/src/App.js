import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './assets/GlobalStyles';

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <p>Find me in src/app.js!</p>
          <Text>Hello</Text>
        </Route>
      </Switch>
    </Router>
  );
};

const Text = styled.p`
  font-family: 'Pearl';
  font-size: 80px;
  text-transform: uppercase;
`;
