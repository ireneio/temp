import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, message, Input } from 'antd';
import {
  close as CloseIcon,
  deleteForever as DeleteIcon,
} from 'react-icons/md';
import Draggable from 'react-draggable';
import * as Cookies from 'js-cookie';

import GlobalStyles from 'layout/GlobalStyles';
import Context from 'context';

import { EMPTY_ARRAY } from '../../constants';
import contextProps from '../../contextProps';
import * as contextFunc from '../../contextFunc';

import TreeNode from './TreeNode';
import StoryWrapper from './StoryWrapper';
import styles from './styles/root.less';
import getDefaultProps from './utils/getDefaultProps';

const { TextArea } = Input;
const root = document.querySelector('body');

export default class Root extends React.PureComponent {
  modifyDataDOM = document.createElement('div');

  isDragging = false;

  contextProps = Cookies.getJSON('context') || contextProps;

  static propTypes = {
    data: PropTypes.shape({}),
    displayName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  state = {
    /* eslint-disable react/destructuring-assignment */
    componentProps:
      Cookies.getJSON(this.props.displayName) ||
      getDefaultProps(this.props.data),
    textareaValue: JSON.stringify(
      Cookies.getJSON(this.props.displayName) ||
        getDefaultProps(this.props.data),
      null,
      2,
    ),
    isOpened: false,
    hasError: false,
    buttonPosition: { x: 0, y: 0 },
    /* eslint-enable react/destructuring-assignment */
  };

  componentDidMount() {
    root.appendChild(this.modifyDataDOM);
  }

  componentDidCatch() {
    message.error('Build Error. Try to choose new data.');
    this.setState({ isOpened: true, hasError: true });
  }

  componentWillUnmount() {
    root.removeChild(this.modifyDataDOM);
  }

  findData = ({ type, name, index, data }, componentProps, originData) => {
    switch (type) {
      case 'object':
        return {
          ...componentProps,
          [name]: this.findData(data, componentProps[name], originData[name]),
        };

      case 'array': {
        const newProps = [...componentProps];

        newProps[index] = this.findData(
          data,
          componentProps[index],
          originData[index],
        );
        return newProps;
      }

      case 'choose': {
        const checkIfNeedToUseProps =
          !componentProps ||
          (data.type === 'object' && componentProps instanceof Array) ||
          (data.type === 'array' && !(componentProps instanceof Array));

        const newProps = checkIfNeedToUseProps
          ? getDefaultProps(originData[index])
          : componentProps;
        const newOriginData = originData[index]?.arrayOf
          ? EMPTY_ARRAY.map(() => originData[index].arrayOf)
          : originData[index];

        return this.findData(data, newProps, newOriginData);
      }

      case 'jsonData':
        return JSON.parse(data);
      default:
        return data;
    }
  };

  selectData = data => {
    const { displayName, data: originData } = this.props;
    const { componentProps } = this.state;
    const newComponentProps = this.findData(data, componentProps, originData);

    Cookies.set(displayName, newComponentProps);
    this.setState({
      componentProps: newComponentProps,
      textareaValue: JSON.stringify(newComponentProps, null, 2),
      hasError: false,
    });
  };

  cleanCache = () => {
    const { displayName, data } = this.props;
    const resetProps = getDefaultProps(data);

    Cookies.set(displayName, resetProps);
    this.setState({
      componentProps: resetProps,
      textareaValue: JSON.stringify(resetProps, null, 2),
      hasError: false,
    });
  };

  updateValueWithInput = () => {
    const { displayName } = this.props;
    const { textareaValue } = this.state;

    try {
      const componentProps = JSON.parse(textareaValue);

      Cookies.set(displayName, componentProps);
      this.setState({ componentProps, hasError: false });
    } catch (e) {
      console.log(e);
      message.error('Parse Error. Can not update data with input');
    }
  };

  render() {
    const { data, children } = this.props;
    const {
      componentProps,
      textareaValue,
      isOpened,
      hasError,
      buttonPosition,
    } = this.state;

    return (
      <Context {...this.contextProps} {...contextFunc}>
        <>
          <GlobalStyles />

          {hasError ? null : (
            <StoryWrapper componentProps={componentProps}>
              {children}
            </StoryWrapper>
          )}

          <Draggable
            defaultPosition={buttonPosition}
            onStart={() => {
              this.isDragging = false;
            }}
            onDrag={() => {
              this.isDragging = true;
            }}
            onStop={(e, { x, y }) =>
              this.setState({ buttonPosition: { x, y } })
            }
          >
            <Button
              className={styles.button}
              type="primary"
              onClick={() => {
                if (this.isDragging) return;

                this.setState({ isOpened: true });
              }}
              ghost
            >
              Modify data
            </Button>
          </Draggable>

          {ReactDOM.createPortal(
            <div
              className={`${styles.root} ${isOpened ? styles.isOpened : ''}`}
            >
              <div>
                <CloseIcon
                  className={styles.closeIcon}
                  onClick={() => this.setState({ isOpened: false })}
                />

                <Button
                  className={styles.cleanCache}
                  type="primary"
                  onClick={this.cleanCache}
                  ghost
                >
                  <DeleteIcon />
                  Clean cache
                </Button>
              </div>

              <TextArea
                className={styles.textarea}
                value={textareaValue}
                onChange={({ target }) =>
                  this.setState({ textareaValue: target.value })
                }
              />

              <div>
                <Button
                  className={styles.textareaButton}
                  type="primary"
                  onClick={this.updateValueWithInput}
                  ghost
                >
                  Update data
                </Button>
              </div>

              <TreeNode
                data={data}
                chooseData={componentProps}
                selectData={this.selectData}
                isRoot
              />
            </div>,
            this.modifyDataDOM,
          )}
        </>
      </Context>
    );
  }
}
