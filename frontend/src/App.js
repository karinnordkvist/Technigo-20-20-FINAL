import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components/macro';

// Styling
import GlobalStyles from './assets/GlobalStyles';

// Components
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Story } from './components/Story';
import { Stories } from './components/Stories';
import { Contact } from './components/Contact';
import { Recipe } from './components/Recipe';
import { Food } from './components/Food';
import { NotFound } from './components/NotFound';

// Reducers
import { location } from './reducers/location';

// ----------------------------------------------------------------
const reducer = combineReducers({
  location: location.reducer,
});

const store = configureStore({ reducer });
// ----------------------------------------------------------------

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <OuterWrapper>
          <Navigation />
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Story} path="/stories/:slug" />
            <Route component={Stories} path="/stories" />
            <Route component={Contact} path="/contact" />
            <Route component={Recipe} path="/food/:slug" />
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
    </Provider>
  );
};

// ----------------------------------------------------------------
const OuterWrapper = styled.div`
  padding: 50px;
  z-index: -2;
`;
