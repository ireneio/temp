// import
import mock from '../mock';

// graphql typescript
import { googleMapModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<googleMapModuleMockFragment>('GoogleMapModule', [
  () => ({
    __typename: 'GoogleMapModule',
    width: 800,
    height: 600,
    href:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14463.733701272171!2d121.50845089999999!3d25.002378049999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9dc34df02cd%3A0x1a9da81d691e83d4!2z5rC45a6J5biC5aC056uZ!5e0!3m2!1szh-TW!2stw!4v1520331378116',
  }),
]);
