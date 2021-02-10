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
import { AnimatePresence } from 'framer-motion';

// Styling
import GlobalStyles from './assets/GlobalStyles';

// Components
import {
  Home,
  Navigation,
  ResponsiveNavigation,
  Story,
  Stories,
  Contact,
  Recipe,
  Food,
  Projects,
  NotFound,
  Footer,
} from './index';

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
          <ResponsiveNavigation />
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={Stories} path="/stories" />
              <Route component={Recipe} path="/food/:slug" />
              <Route component={Food} path="/food" />
              <Route component={Story} path="/projects/:slug" />
              <Route component={Projects} path="/projects" />
              <Route component={Contact} path="/contact" />

              {/* Route to 404-page */}
              <Route exact path="/404">
                <NotFound />
              </Route>

              {/* Redirect to 404-page */}
              <Redirect to="/404" />
            </Switch>
          </AnimatePresence>
          <Footer />
        </OuterWrapper>
      </Router>
    </Provider>
  );
};

// ----------------------------------------------------------------
const OuterWrapper = styled.div``;
