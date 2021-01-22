import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components/macro';

// Styling
import GlobalStyles from './assets/GlobalStyles';

// Components
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Story } from './components/Story';
import { Stories } from './components/Stories';
import { Contact } from './components/Contact';
import { Food } from './components/Food';
import { NotFound } from './components/NotFound';

// ----------------------------------------------------------------

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <OuterWrapper>
        <Navigation />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Story} path="/stories/:slug" />
          <Route component={Stories} path="/stories" />
          <Route component={Contact} path="/contact" />
          <Route component={Food} path="/food" />

          {/* Route to 404-page */}
          <Route exact path="/404">
            <NotFound />
          </Route>

          {/* Redirect to 404-page */}
          <Redirect to="/404" />
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
  z-index: -2;
`;
