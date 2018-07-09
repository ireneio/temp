import color from 'color';
import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  width: '100%',
  fontSize: '16px',
  wordBreak: 'break-all',
  color: colors[3],
});

export const wrapper = {
  maxWidth: '1000px',
  margin: 'auto',
};

export const modalStyle = colors => ({
  position: 'absolute',
  bottom: 0,
  top: 'initial',
  margin: 0,
  padding: 0,
  borderRadius: 0,
  maxHeight: '100%',
  width: '100% !important',
  overflow: 'auto',
  textAlign: 'center',
  color: colors[3],
  '.ant-modal-content': {
    borderRadius: 0,
    backgroundColor: colors[0],
  },
  '.ant-modal-body': {
    padding: '0',
    fontSize: '16px',
  },
  'span > span, span > a': {
    width: '100%',
    padding: '10px 0',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  'span > :first-child': {
    backgroundColor: colors[4],
  },
  'span > :not(:first-child):not(:last-child)': {
    borderBottom: '1px solid #ccc',
  },
  'span > span:hover:not(:first-child), span > a:hover': {
    backgroundColor: color(colors[4])
      .alpha(0.1)
      .string(),
  },
});

export const listStyle = colors => ({
  '.ant-btn': {
    color: colors[4],
    borderColor: colors[4],
    backgroundColor: 'transparent',
  },
});

export const table = {
  padding: '40px 0',
  [PHONE_MEDIA]: {
    padding: '0',
  },
};

export const thead = {
  fontWeight: 'bold',
  ':hover': {
    backgroundColor: 'transparent',
  },
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const row = colors => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px',
  borderBottom: '1px solid #ccc',
  backgroundColor: 'transparent',
  transition: '0.3s',
  ':hover': {
    backgroundColor: color(colors[4])
      .alpha(0.1)
      .string(),
  },
  [PHONE_MEDIA]: {
    justifyContent: 'center',
  },
});

export const main = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [PHONE_MEDIA]: {
    width: '300px',
    flexFlow: 'wrap',
    justifyContent: 'flex-start',
  },
};

export const shadow = {
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    cursor: 'pointer',
  },
};

export const column = {
  width: '150px',
  [PHONE_MEDIA]: {
    width: '100%',
  },
};

export const orderNo = {
  textDecoration: 'underline',
  [PHONE_MEDIA]: {
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '5px 0',
  },
};

export const showOnMobile = {
  display: 'none',
  marginRight: '4px',
  [PHONE_MEDIA]: {
    display: 'inline-block',
  },
};

export const status = {
  width: '150px',
  [PHONE_MEDIA]: {
    width: 'auto',
    marginRight: '15px',
  },
};

export const panelWrapper = {
  [PHONE_MEDIA]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export const panel = {
  minWidth: '300px',
  flex: '1',
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const cursor = underline => ({
  cursor: 'pointer',
  ...(underline && {
    textDecoration: 'underline',
  }),
});
