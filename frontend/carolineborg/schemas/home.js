import { string } from 'prop-types';

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'hero_image',
      title: 'Hero Image',
      description:
        'Format: Fullscreen, on desktop horizontal rectangle, on tablet/phone vertical rectangle. Centered position in the image, both horizontally and vertically.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'hero_title',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'hero_text',
      title: 'Hero Text',
      type: 'text',
    },
    {
      name: 'intro_text',
      title: 'Intro',
      type: 'text',
    },
    {
      name: 'intro_image',
      description: 'Format: 300x370px.',
      title: 'Intro Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category_images',
      title: 'Category Images',
      description:
        'Format: 33% width on desktop, 100% width on tablet/phone. Add 3 images for the Category-section. Make sure the image goes with the headline specified in below list.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(3).max(3),
    },
    {
      name: 'category_titles',
      title: 'Category Titles',
      description:
        'Add 3 titles for the Category-section. Make sure the title goes with the images above. Choose from Alla projekt, Fotografi, PR, Styling, Editorial or Rörligt.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(3).max(3),
    },
    {
      name: 'single_category_image',
      title: 'Single Category Image',
      description:
        'Full width, horizontal rectangle. on desktop horizontal rectangle, on tablet/phone vertical rectangle.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'single_category_title',
      title: 'Single Category Title',
      description:
        'Title for above image. Choose from Alla projekt, Fotografi, PR, Styling, Editorial or Rörligt.',
      type: 'string',
    },
    {
      name: 'work_title',
      title: 'Work Together - Title',
      type: 'string',
    },
    {
      name: 'work_text',
      title: 'Work Together - Text',
      description:
        'Text can be parted up into sections by creating a new paragraph.',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'work_text2',
      title: 'Work Together - Text 2',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
