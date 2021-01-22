import { string } from 'prop-types';

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'hero_image',
      type: 'image',
    },
    {
      name: 'hero_title',
      type: 'string',
    },
    {
      name: 'hero_text',
      type: 'text',
    },
  ],
};
