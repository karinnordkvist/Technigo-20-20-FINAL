import { string } from 'prop-types';

export default {
  name: 'studiorental',
  title: 'Studio Rental',
  type: 'document',
  fields: [
    {
      name: 'pagetitle',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Main Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
};
