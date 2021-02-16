import { string } from 'prop-types';

export default {
  name: 'intros',
  title: 'Intro Pages',
  type: 'document',
  fields: [
    {
      name: 'stories_intro_text',
      title: 'Stories Intro - Text',
      type: 'text',
    },
    {
      name: 'food_intro_text',
      title: 'Food Intro - Text',
      type: 'text',
    },
  ],
};
