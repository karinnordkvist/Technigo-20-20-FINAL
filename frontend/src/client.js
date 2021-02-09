import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'yi8mv9iz',
  dataset: 'production',
  useCdn: true,
});
