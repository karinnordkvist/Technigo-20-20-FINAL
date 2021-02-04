import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';

import blockContent from './blockContent';
import home from './home';
import creator from './creator';
import project from './project';
import recipe from './recipe';
import contact from './contact';
import grid from './grid';
import testHome from './testHome';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    home,
    project,
    recipe,
    creator,
    contact,
    grid,
    blockContent,
  ]),
});
