import { string } from 'prop-types';

export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'thumbnail',
      type: 'image',
    },
    {
      name: 'byline',
      type: 'string',
    },
    {
      name: 'intro',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
};
