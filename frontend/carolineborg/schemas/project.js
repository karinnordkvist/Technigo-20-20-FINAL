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
      name: 'selected_story',
      title: 'Feature in Stories',
      description:
        'Check this box if you want this project to be featured on the Stories page.',
      type: 'boolean',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug*',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'tags',
      title:
        'Type of project* (tags: photography, styling, pr, editorial or motion)',
      description:
        'Add all tags needed and make sure you spell it right, in lower case.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      title: 'Secondary byline',
      description:
        'Add full name. If you want to add more than one person, separate the names with a comma.',
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
      description: 'Horizontal orientation works best here.',
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
