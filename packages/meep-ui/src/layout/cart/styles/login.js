import { PHONE_MEDIA } from 'constants/media';

export const root = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '50px 40px',
  [PHONE_MEDIA]: {
    padding: '50px 20px',
  },
};

export const header = {
  margin: '0px 0px 40px',
  fontSize: '20px',
  fontWeight: 'normal',
  textAlign: 'center',
};

export const formItem = {
  margin: '10px 0px',
};

export const input = {
  borderRadius: '0px',
};

export const buttonRoot = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '15px 0px 0px',
};

export const buttonRootExtend = {
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [PHONE_MEDIA]: {
    display: 'block',
  },
};

export const forgetPassword = {
  cursor: 'pointer',
};

export const buttonWidth = {
  width: 'calc(50% - 15px)',
  [PHONE_MEDIA]: {
    margin: '10px 0px',
    width: '100%',
  },
};

export const button = colors => ({
  padding: '0px',
  width: '100%',
  height: '50px',
  color: colors[3],
  borderColor: colors[3],
  borderRadius: '0px',
});

export const loginButton = {
  height: '50px',
  width: 'initial',
  minWidth: '150px',
};

export const buttonWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
};

export const icon = colors => ({
  width: '48px',
  height: '48px',
  padding: '16px',
  color: colors[0],
  backgroundColor: colors[3],
});

export const buttonText = {
  flexGrow: 1,
};

export const fbButton = {
  border: '1px solid #3b5998',
  color: '#3b5998',
};

export const fbIcon = {
  backgroundColor: '#3b5998',
  color: '#ffffff',
};

export const hr = colors => ({
  minHeight: '1px',
  backgroundColor: colors[5],
  margin: '32px -24px',
  [PHONE_MEDIA]: {
    margin: '32px -12px',
  },
});

export const draftText = {
  marginBottom: '10px',
  padding: '0px',
};
