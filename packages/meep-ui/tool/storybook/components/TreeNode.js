import React from 'react';
import PropTypes from 'prop-types';

import { EMPTY_ARRAY } from '../../constants';

import styles from './styles/treeNode.less';

export default class TreeNode extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    chooseData: PropTypes.any,
    isRoot: PropTypes.bool,
    selectData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
    chooseData: null,
    isRoot: false,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    isOpened: this.props.isRoot,
    objectIsOpened: {},
  };

  getChooseData = nextChooseData => {
    const { chooseData } = this.props;

    if (
      chooseData === 'no data' ||
      nextChooseData === undefined ||
      nextChooseData === chooseData
    ) {
      return 'no data';
    }

    if (nextChooseData === null) return 'null';

    return nextChooseData;
  };

  toggleChildren = () => {
    const { isOpened } = this.state;

    this.setState({ isOpened: !isOpened });
  };

  render() {
    const { data, chooseData, isRoot, selectData } = this.props;
    const { isOpened, objectIsOpened } = this.state;

    if (data?.arrayOf) {
      return (
        <div className={styles.flex}>
          <div
            className={`${styles.title} ${styles.type}`}
            onClick={this.toggleChildren}
          >
            array
          </div>

          {!isOpened ? null : (
            <div>
              {EMPTY_ARRAY.map((_, index) => (
                /* eslint-disable react/no-array-index-key */
                <TreeNode
                  key={index}
                  data={data.arrayOf}
                  chooseData={this.getChooseData(
                    chooseData instanceof Array
                      ? chooseData[index]
                      : chooseData,
                  )}
                  selectData={childData =>
                    selectData({ type: 'array', index, data: childData })
                  }
                />
                /* eslint-enable react/no-array-index-key */
              ))}
            </div>
          )}
        </div>
      );
    }

    /**
     * This is nly for choosing data.
     * If the structure of this data is array, it should use `arrayOf`.
     */
    if (data instanceof Array) {
      return (
        <div className={styles.array}>
          {data.map((d, index) => (
            /* eslint-disable react/no-array-index-key */
            <TreeNode
              key={index}
              data={d}
              chooseData={chooseData}
              selectData={childData =>
                selectData({ type: 'choose', index, data: childData })
              }
            />
            /* eslint-enable react/no-array-index-key */
          ))}
        </div>
      );
    }

    if (data instanceof Object) {
      const dataNames = Object.keys(data);

      return (
        <div className={styles.flex}>
          {isRoot ? null : (
            <div
              className={`${styles.title} ${styles.type}`}
              onClick={this.toggleChildren}
            >
              object
            </div>
          )}

          {!isOpened ? null : (
            <div>
              {dataNames.length === 0 ? (
                <TreeNode
                  data={'{}'}
                  chooseData={this.getChooseData(
                    chooseData instanceof Object &&
                      Object.keys(chooseData).length === 0
                      ? '{}'
                      : chooseData,
                  )}
                  selectData={() =>
                    selectData({ type: 'jsonData', data: '{}' })
                  }
                />
              ) : (
                dataNames.map(name => (
                  <div key={name} className={styles.flex}>
                    <div
                      className={styles.title}
                      onClick={() =>
                        this.setState({
                          objectIsOpened: {
                            ...objectIsOpened,
                            [name]: !objectIsOpened[name],
                          },
                        })
                      }
                    >
                      {name}
                    </div>

                    {!objectIsOpened[name] ? null : (
                      <div>
                        <TreeNode
                          data={data[name]}
                          chooseData={this.getChooseData(chooseData?.[name])}
                          selectData={childData => {
                            selectData({
                              type: 'object',
                              name,
                              data: childData,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={`${styles.option} ${
          chooseData === (data === null ? 'null' : data) ? styles.isMatched : ''
        }`}
        onClick={() => selectData({ type: 'data', data })}
      >
        {data === null ? 'null' : data.toString()}
      </div>
    );
  }
}
