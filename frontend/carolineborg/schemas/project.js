import { string } from 'prop-types';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'date',
      type: 'datetime',
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
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { value: 'grid-1', title: 'Grid 1' },
          { value: 'grid-2', title: 'Grid 2' },
          { value: 'grid-3', title: 'Grid 3' },
        ],
      },
    },
  ],
};
