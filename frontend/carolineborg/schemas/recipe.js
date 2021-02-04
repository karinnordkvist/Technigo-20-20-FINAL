import { string } from 'prop-types';

export default {
  name: 'recipe',
  title: 'Recipe',
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
      name: 'category',
      type: 'string',
      options: {
        list: [
          { value: 'Bakning', title: 'Bakning' },
          { value: 'Middag', title: 'Middag' },
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
    // {
    //   name: 'steps',
    //   description: 'How to cook the recipe',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   validation: (Rule) => Rule.required(),
    // },
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
        { type: 'image' },
      ],
    },
    {
      name: 'break_out_text',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
};
