import transformColor from 'color';

export const root = (isError, colors) => ({
  borderBottom: `1px solid ${colors[isError ? 2 : 5]}`,
  ...(!isError
    ? {}
    : {
        background: colors[5],
      }),
});

export const item = {
  padding: '20px 10px',
};

/** image */
export const imgBlock = {
  width: '60px',
  height: '60px',
  position: 'relative',
  padding: '20px 5px',
};

export const removeIcon = colors => ({
  padding: '2px',
  width: '16px',
  height: '16px',
  position: 'absolute',
  top: 'calc(-8px + 20px)',
  right: '-8px',
  fill: colors[2],
  background: colors[4],
  borderRadius: '50%',
  cursor: 'pointer',
});

/** title */
export const title = {
  flexGrow: 1,
  lineHeight: '21px',
  letterSpacing: '0.5px',
  wordBreak: 'break-all',
};

export const spec = {
  fontSize: '14px',
  marginTop: '5px',
};

export const activity = colors => ({
  margin: '12px 0px 0px',
  color: transformColor(colors[3]).alpha(0.5),
});

export const tagIcon = {
  margin: '0px 5px',
};

/** gift */
export const gift = (isError, colors) => ({
  textAlign: 'right',
  ...(!isError
    ? {}
    : {
        color: transformColor(colors[3]).alpha(0.5),
      }),
});
