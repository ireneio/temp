export const root = {
  width: '100%',
  padding: '15px 5px',
};

export const Style = colors => ({
  '*': {
    wordBreak: 'break-all',
  },

  p: {
    marginBottom: 0,
  },

  'a, a:hover, a:active, a:focus, a:visited': {
    color: colors[3],
  },
});
