import { string } from 'prop-types';

export default {
  name: 'recipe',
  title: 'Recipes',
  type: 'document',
  initialValue: {
    selected_home: false,
  },
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
      name: 'selected_home',
      title: 'Feature on Home page',
      description:
        'Check this box if you want this project to be featured on the Home page.',
      type: 'boolean',
    },
    {
      name: 'category',
      type: 'string',
      options: {
        list: [
          { value: 'Sött', title: 'Sött' },
          { value: 'Bak', title: 'Bak' },
          { value: 'Mat', title: 'Mat' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'portions',
      title: 'Portions/Amount',
      type: 'string',
    },
    {
      name: 'thumbnail',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
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
      description: 'If anyone else was part of creating the recipe',
      type: 'string',
    },
    {
      name: 'main_image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'intro',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ingredients',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'toppings',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'steps',
      description: 'How to cook the recipe',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Text',
          fields: [{ type: 'string', name: 'text' }],
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'break_out_text',
      type: 'string',
    },
  ],
};
