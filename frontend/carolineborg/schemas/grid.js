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
      description:
        'Make sure that the amount of images matches the selected grid.',
      type: 'string',
      options: {
        list: [
          {
            value: 'grid-1',
            title: '1 image, full width (obs. 1 image!)',
          },
          { value: 'grid-2', title: '2 vertical images' },
          {
            value: 'grid-3',
            title: '1 bigger image, 1 smaller, partly on top of the other',
          },
          {
            value: 'grid-4',
            title: '3 images horizontally (obs. 3 images!)',
          },
          {
            value: 'grid-5',
            title: '2 horizontal images',
          },
          {
            value: 'grid-6',
            title: '1 smaller image, 1 bigger in the back',
          },
          {
            value: 'grid-7',
            title: '1 big image, block of text on top (obs. 1 image!)',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
