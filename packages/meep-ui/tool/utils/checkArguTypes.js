import PropTypes from 'prop-types';
import uuid from 'uuid';

export default (funcName, arguTypes, argus) => {
  const key = uuid.v4();

  argus.forEach((argu, index) => {
    PropTypes.checkPropTypes(
      {
        [key]: arguTypes[index],
      },
      { [key]: argu },
      `\`argument [${index}]\``,
      funcName,
    );
  });
};
