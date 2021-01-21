import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Styling
import GlobalStyles from './assets/GlobalStyles';

// Components
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { Food } from './components/Food';

// ----------------------------------------------------------------

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <OuterWrapper>
        <Navigation />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Contact} path="/contact" />
          <Route component={Food} path="/food" />
        </Switch>
      </OuterWrapper>
    </Router>
  );
};

// ----------------------------------------------------------------
const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  background: #fcfbf8;
`;
