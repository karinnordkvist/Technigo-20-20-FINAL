import { string } from 'prop-types';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'thumbnail',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'main_image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: { type: 'creator' },
    },
    {
      name: 'secondary_byline',
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
    {
      name: 'quote',
      type: 'text',
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
