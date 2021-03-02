import { string } from 'prop-types';

export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  initialValue: {
    selected_home: false,
    hidden_project: false,
  },
  fields: [
    {
      name: 'title',
      title: 'Title*',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'selected_story',
      title: 'Feature in Stories',
      description:
        'Check this box if you want this project to be featured on the Stories page.',
      type: 'boolean',
    },
    {
      name: 'selected_home',
      title: 'Feature on Home page',
      description:
        'Check this box if you want this project to be featured on the Home page.',
      type: 'boolean',
    },
    {
      name: 'hidden_project',
      title: 'Hide on Projects page',
      description:
        'Check this box if you want this project to hidden from the projects page.',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Type of project*',
      description:
        'Add all tags needed and make sure you spell it right, and use right case (upper/lower) to be able to sort them later. Choose from: fotografi, styling, PR(upper case), editorial or rörligt.',
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
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'infobox_byline',
      title: 'Infobox byline',
      description: 'Byline for the infobox.',
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
      options: {
        hotspot: true,
      },
    },
    {
      name: 'main_image',
      title: 'Main Image*',
      type: 'image',
      description: 'Horizontal orientation works best here.',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'text',
    },
    {
      name: 'text',
      title: 'Main Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'grids',
      title: 'Image Grids',
      description:
        'Add 2 images and/or some text, and select a type of layout.',
      type: 'array',
      of: [{ type: 'grid' }],
    },
  ],
};
