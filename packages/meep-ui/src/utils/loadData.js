import React from 'react';
import { Spin } from 'antd';
import { Style } from 'radium';

const mockPromiseData = (prevProps, fields) =>
  fields.reduce(
    (defaultState, fieldKey) => ({
      ...defaultState,
      [fieldKey]:
        prevProps[fieldKey] instanceof Promise
          ? undefined
          : prevProps[fieldKey],
    }),
    {},
  );

const checkPromiseExist = (prevProps, fields) =>
  fields.some(fieldKey => prevProps[fieldKey] instanceof Promise);

const styles = {
  '.ant-spin-nested-loading > div > .ant-spin': {
    maxHeight: 'initial',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  '.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot': {
    top: '160px',
  },
};

export default fields => Component =>
  class LoadData extends React.Component {
    state = {
      ...mockPromiseData(this.props, fields),
      isLoading: checkPromiseExist(this.props, fields),
    };

    componentDidMount() {
      const { isLoading } = this.state;

      if (!isLoading) return;

      (async () => {
        const fieldData = await Promise.all(
          fields.map(async key => ({
            key,
            // eslint-disable-next-line react/destructuring-assignment
            data: await this.props[key],
          })),
        );

        this.setState({
          ...fieldData.reduce(
            (newState, { key, data }) => ({
              ...newState,
              [key]: data,
            }),
            {},
          ),
          isLoading: false,
        });
      })();
    }

    render() {
      const { isLoading, ...state } = this.state;

      if (isLoading) {
        return (
          <Spin>
            <Style rules={styles} />

            <Component {...this.props} {...state} />
          </Spin>
        );
      }

      return <Component {...this.props} {...state} />;
    }
  };
