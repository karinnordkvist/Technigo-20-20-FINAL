import { string } from 'prop-types';

export default {
  name: 'grid',
  title: 'Grid',
  type: 'document',
  fields: [
    // {
    //   name: 'name',
    //   title: 'Name',
    //   type: 'string',
    // },
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
      name: 'name',
      title: 'Grid Type',
      description:
        'Make sure that the amount of images matches the selected grid.',
      type: 'string',
      options: {
        list: [
          {
            value: 'grid-1',
            title: 'Grid 1 - 1 horizontal image, full width',
          },
          {
            value: 'grid-2',
            title: 'Grid 2 - 2 vertical images',
          },
          {
            value: 'grid-3',
            title:
              'Grid 3 - 1 bigger image, 1 smaller, partly on top of the other',
          },
          {
            value: 'grid-4',
            title: 'Grid 4 - 3 images horizontally (obs. 3 images!)',
          },
          {
            value: 'grid-5',
            title: 'Grid 5 - 1 smaller image, 1 bigger in the back',
          },
          {
            value: 'grid-6',
            title: 'Grid 6 - 1 big image, block of text on top',
          },
          {
            value: 'grid-7',
            title: 'Grid 7 - 1 big image, 1 image above the other',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
