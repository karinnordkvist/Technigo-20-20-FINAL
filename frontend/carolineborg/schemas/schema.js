import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';

import blockContent from './blockContent';
import home from './home';
import intros from './intros';
import creator from './creator';
import project from './project';
import recipe from './recipe';
import contact from './contact';
import grid from './grid';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    home,
    intros,
    project,
    recipe,
    creator,
    contact,
    grid,
    blockContent,
  ]),
});
