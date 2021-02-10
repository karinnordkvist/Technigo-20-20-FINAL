import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

// Importing all components in here for smoother imports in the App
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { ResponsiveNavigation } from './components/ResponsiveNavigation';
import { CategoryImage } from './components/CategoryImage';
import { Story } from './components/Story';
import { Stories } from './components/Stories';
import { Contact } from './components/Contact';
import { Recipe } from './components/Recipe';
import { Food } from './components/Food';
import { Projects } from './components/Projects';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { ThumbnailGallery } from './components/ThumbnailGallery';

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
};

ReactDOM.render(<App />, document.getElementById('root'));
