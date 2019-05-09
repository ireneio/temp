import { PHONE_MEDIA } from 'constants/media';

export const root = {
  display: 'flex',
  flexDirection: 'column',
};

export const productList = isEmpty => ({
  flexGrow: 1,
  maxHeight: '100%',
  padding: '0px 25px',
  overflowY: 'scroll',
  ...(!isEmpty
    ? {}
    : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }),
  [PHONE_MEDIA]: {
    padding: '0px',
  },
});

export const table = {
  width: '100%',
};

export const emptyCartText = {
  margin: '17px 0px',
  letterSpacing: '2px',
  color: '#6F7070',
  fontSize: '17px',
};
