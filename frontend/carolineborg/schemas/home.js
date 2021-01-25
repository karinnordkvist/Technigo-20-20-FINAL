import { string } from 'prop-types';

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'hero_image',
      title: 'Hero Image',
      type: 'image',
    },
    {
      name: 'hero_title',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'hero_text',
      title: 'Hero Text',
      type: 'text',
    },
    {
      name: 'intro_text',
      title: 'Intro',
      type: 'text',
    },
  ],
};
