import S from '@sanity/desk-tool/structure-builder';

const hiddenDocTypes = (listItem) => !['grid'].includes(listItem.getId());
export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem()
        .title('Contact')
        .child(S.document().schemaType('contact').documentId('contact')),
      ...S.documentTypeListItems()
        .filter((listItem) => !['home', 'contact'].includes(listItem.getId()))
        .filter(hiddenDocTypes),
    ]);
