import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-hierarchy';

import { ID_TYPE, LOCALE_TYPE } from 'constants/propTypes';

const treemap = d3
  .stratify()
  .id(d => d.key)
  .parentId(d => d.parent);

const generateKey = title =>
  Object.keys(title)
    .map(key => title[key])
    .join('-');

const buildTree = ({ specs, variants, ...product }) => {
  if (!specs) {
    return {
      ...product,
      specs,
      variants,
    };
  }

  const specsStore = specs.reduce(
    (result, { id }) => ({ ...result, [id]: [] }),
    {},
  );

  const newVariants = (variants || []).reduce(
    (variantsResult, variant) => {
      const { specs: variantSpecs } = variant;
      let preKey = 'root';

      return (variantSpecs || []).reduce(
        (specsResult, { title, specId }, index) => {
          const key = `${preKey}_${generateKey(title)}`;
          const parent = preKey;

          preKey = key;

          if (
            specsStore[specId].includes(key) &&
            index !== variantSpecs.length - 1
          )
            return specsResult;

          specsStore[specId].push(key);

          return [
            ...specsResult,
            {
              ...(index !== variantSpecs.length - 1 ? null : { variant }),
              key,
              parent,
              title,
            },
          ];
        },
        variantsResult,
      );
    },
    [{ key: 'root' }],
  );

  return {
    ...product,
    specs,
    variants,
    variantsTree: treemap(newVariants),
  };
};

export default propsKey => Component =>
  class BuildVariantsTree extends React.Component {
    static propTypes = {
      [propsKey]: PropTypes.shape({
        id: ID_TYPE.isRequired,
        specs: PropTypes.arrayOf(
          PropTypes.shape({
            id: ID_TYPE.isRequired,
          }).isRequired,
        ),
        variants: PropTypes.arrayOf(
          PropTypes.shape({
            specs: PropTypes.arrayOf(
              PropTypes.shape({
                specId: ID_TYPE.isRequired,
                title: LOCALE_TYPE.isRequired,
              }).isRequired,
            ),
          }).isRequired,
        ),
      }),
    };

    static defaultProps = {
      [propsKey]: null,
    };

    state = {
      [propsKey]: null,
    };

    static getDerivedStateFromProps(nextProps, preState) {
      const { id } = nextProps[propsKey] || {};

      if (id && id !== (preState[propsKey] || {}).id)
        return { [propsKey]: buildTree(nextProps[propsKey]) };

      return null;
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
