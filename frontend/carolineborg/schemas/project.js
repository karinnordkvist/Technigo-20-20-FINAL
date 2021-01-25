import { string } from 'prop-types';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title*',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug*',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'client',
      title: 'Company / Client',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail*',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'main_image',
      title: 'Main Image*',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'intro',
      type: 'text',
    },
    {
      name: 'grids',
      title: 'Image Grids',
      description:
        'Add 2 images and/or some text, and select a type of layout.',
      type: 'array',
      of: [{ type: 'grid' }],
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
  ],
};
