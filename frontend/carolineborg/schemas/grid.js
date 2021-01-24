import { string } from 'prop-types';

export default {
  name: 'grid',
  title: 'Grid',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'grid_type',
      title: 'Grid Type',
      type: 'string',
      options: {
        list: [
          { value: 'grid-1', title: 'Grid 1' },
          { value: 'grid-2', title: 'Grid 2' },
          { value: 'grid-3', title: 'Grid 3' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
