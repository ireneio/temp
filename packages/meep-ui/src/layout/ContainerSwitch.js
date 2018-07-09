import React from 'react';
import PropTypes from 'prop-types';
import warning from 'fbjs/lib/warning';

import FixedTop from 'fixedTop';
import SecondTop from 'secondTop';
import Sidebar from 'sidebar';
import Bottom from 'bottom';
import Block from 'block';
import MobileLayout from 'mobileLayout';

import * as styles from './styles/containerSwitch';

const ContainerSwitch = ({
  containerName,
  width,
  blocks,
  fixedtop,
  secondtop,
  sidebar,
  fixedbottom,
  children,
  ...props
}) => {
  const fixedTopProps = { ...props, ...fixedtop };
  const secondTopProps = { ...props, ...secondtop };
  const sidebarProps = { ...props, ...sidebar };
  const bottomProps = { ...props, ...fixedbottom };
  const blockComponent = children || <Block width={width} blocks={blocks} />;

  switch (containerName) {
    case 'DefaultContainer':
      return (
        <React.Fragment>
          {blockComponent}
          <Bottom {...bottomProps} />
        </React.Fragment>
      );

    case 'FixedTopContainer':
      return (
        <MobileLayout {...props} fixedtop={fixedtop}>
          <FixedTop {...fixedTopProps} />
          {blockComponent}
          <Bottom {...bottomProps} />
        </MobileLayout>
      );

    case 'TwoTopsContainer':
      return (
        <MobileLayout {...props} fixedtop={fixedtop} secondtop={secondtop}>
          <FixedTop {...fixedTopProps} />
          <SecondTop {...secondTopProps} />
          {blockComponent}
          <Bottom {...bottomProps} />
        </MobileLayout>
      );

    case 'FixedTopContainerWithSidebar':
      return (
        <MobileLayout {...props} fixedtop={fixedtop} sidebar={sidebar}>
          <FixedTop {...fixedTopProps} />
          <Sidebar {...sidebarProps} style={styles.hideSidebarInPhone}>
            {blockComponent}
            <Bottom {...bottomProps} />
          </Sidebar>
        </MobileLayout>
      );

    case 'TwoTopsContainerWithSidebar':
      return (
        <MobileLayout
          {...props}
          fixedtop={fixedtop}
          secondtop={secondtop}
          sidebar={sidebar}
        >
          <FixedTop {...fixedTopProps} />
          <SecondTop {...secondTopProps} />
          <Sidebar {...sidebarProps} style={styles.hideSidebarInPhone}>
            {blockComponent}
            <Bottom {...bottomProps} />
          </Sidebar>
        </MobileLayout>
      );

    case 'FixedEndsContainer':
      return (
        <React.Fragment>
          <FixedTop {...fixedTopProps} />
          {blockComponent}
          <Bottom {...bottomProps} />
        </React.Fragment>
      );

    default:
      warning(
        process.env.NODE_ENV === 'production',
        `[component] ${containerName} does not exist.`,
      );

      /* istanbul ignore next */
      return null; // for production
  }
};

ContainerSwitch.propTypes = {
  width: PropTypes.number,
  containerName: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  fixedtop: PropTypes.shape({}).isRequired,
  secondtop: PropTypes.shape({}).isRequired,
  sidebar: PropTypes.shape({}).isRequired,
  fixedbottom: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
};

ContainerSwitch.defaultProps = {
  width: null,
  children: null,
};

export default ContainerSwitch;
