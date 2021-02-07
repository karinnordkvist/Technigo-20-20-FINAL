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
import { ResponsiveNavigation } from './components/ResponsiveNavigation';
import { Home } from './components/Home';
import { Story } from './components/Story';
import { SelectedStory } from './components/SelectedStory';
import { Stories } from './components/Stories';
import { Contact } from './components/Contact';
import { Recipe } from './components/Recipe';
import { Food } from './components/Food';
import { ListedProjects } from './components/ListedProjects';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';

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
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={SelectedStory} path="/stories/:slug" />
            <Route component={Stories} path="/stories" />
            <Route component={Recipe} path="/food/:slug" />
            <Route component={Food} path="/food" />
            <Route component={Story} path="/projects/:slug" />
            <Route component={ListedProjects} path="/projects" />
            <Route component={Contact} path="/contact" />

            {/* Route to 404-page */}
            <Route exact path="/404">
              <NotFound />
            </Route>

            {/* Redirect to 404-page */}
            <Redirect to="/404" />
          </Switch>
          <Footer />
        </OuterWrapper>
      </Router>
    </Provider>
  );
};

// ----------------------------------------------------------------
const OuterWrapper = styled.div``;
