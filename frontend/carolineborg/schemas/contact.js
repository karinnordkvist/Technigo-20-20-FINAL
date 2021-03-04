import { string } from 'prop-types';

export default {
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'main_image',
      description:
        '35% width of the window. Proportions inherited from the image.',
      title: 'Main Image',
      type: 'image',
    },
    {
      name: 'main_text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email-adress',
      type: 'string',
    },
  ],
};
