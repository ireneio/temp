export const mobileWidth = '(max-width: 768px)';

const convertHEXToRGB = hex => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

export const root = {
  marginBottom: '25px',
  [`@media ${mobileWidth}`]: {
    marginBottom: 0,
    padding: '20px 10px 5px',
    borderBottom: 'solid 1px #e0e0e0',
  },
};

export const question = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '4px',
};

export const radioIcon = {
  margin: '0 8px 0 0',
  color: '#696969',
};

export const questionText = {
  flexGrow: 1,
  marginRight: '20px',
};

const hideOnMobile = {
  [`@media ${mobileWidth}`]: {
    display: 'none',
  },
};

const showOnMobile = styles => ({
  display: 'none',
  [`@media ${mobileWidth}`]: {
    display: 'inline-block',
    ...(styles || {}),
  },
});

export const questionDate = {
  fontSize: '14px',
  color: '#b3b3b3',
  whiteSpace: 'nowrap',
  ...hideOnMobile,
};

export const mobileQuestionDate = {
  ...questionDate,
  ...showOnMobile({
    fontSize: '12px',
  }),
};

export const checkReply = colors => ({
  color: colors[4],
  marginBottom: '10px',
  cursor: 'pointer',
  [`@media ${mobileWidth}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const checkReplyText = {
  ...hideOnMobile,
  marginLeft: '5px',
};

export const mobileCheckReplyText = {
  ...showOnMobile({
    marginRight: '2px',
  }),
};

export const answer = {
  marginLeft: '24px',
  [`@media ${mobileWidth}`]: {
    marginBottom: '15px',
  },
};

export const answers = colors => ({
  background: `rgba(${convertHEXToRGB(colors[4])}, 0.1)`,
  padding: '12px 18px 2px',
  [`@media ${mobileWidth}`]: {
    fontSize: '15px',
    padding: '10px 12px',
  },
});

export const answerText = {
  marginBottom: '12px',
  [`@media ${mobileWidth}`]: {
    marginBottom: 0,
  },
};

export const answerDate = {
  fontSize: '13px',
  marginLeft: '15px',
  ...hideOnMobile,
};

export const mobileAnswerDate = {
  ...showOnMobile({
    display: 'block',
    fontSize: '12px',
    textAlign: 'right',
    marginTop: '10px',
  }),
};
