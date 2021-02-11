import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

// Importing all components in here for smoother imports in the App
import { Home } from './pages/Home';
import { Navigation } from './components/Navigation';
import { ResponsiveNavigation } from './components/ResponsiveNavigation';
import { CategoryImage } from './components/CategoryImage';
import { Story } from './pages/Story';
import { Stories } from './pages/Stories';
import { Contact } from './pages/Contact';
import { Recipe } from './pages/Recipe';
import { Food } from './pages/Food';
import { Projects } from './pages/Projects';
import { NotFound } from './pages/NotFound';
import { Footer } from './pages/Footer';
import { ThumbnailGallery } from './components/ThumbnailGallery';
import { GoToTopButton } from './components/GoToTopButton';

export {
  Home,
  Navigation,
  ResponsiveNavigation,
  CategoryImage,
  Story,
  Stories,
  Contact,
  Recipe,
  Food,
  Projects,
  NotFound,
  Footer,
  ThumbnailGallery,
  GoToTopButton,
};

ReactDOM.render(<App />, document.getElementById('root'));
