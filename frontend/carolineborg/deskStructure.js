import S from '@sanity/desk-tool/structure-builder';

const hiddenDocTypes = (listItem) => !['grid'].includes(listItem.getId());
export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contact').documentId('contact')),
      S.listItem()
        .title('Intro Pages')
        .child(S.document().schemaType('intros').documentId('intros')),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            !['home', 'contact', 'intros'].includes(listItem.getId())
        )
        .filter(hiddenDocTypes),
    ]);
