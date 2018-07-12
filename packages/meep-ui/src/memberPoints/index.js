import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import moment from 'moment';
import { enhancer } from 'layout';
import { Table } from 'antd';

import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class MemberPoints extends React.PureComponent {
  static propTypes = {
    userPoints: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        activityId: ID_TYPE,
        activity: PropTypes.shape({
          zh_TW: PropTypes.string.isRequired,
        }),
        title: PropTypes.string,
        note: PropTypes.string,
        class: PropTypes.oneOf([1, 2, 3, 4, 99]).isRequired,
        points: PropTypes.number.isRequired,
        endTime: PropTypes.number,
        startTime: PropTypes.number.isRequired,
        unlimitedDate: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
  };

  getColor = record => {
    const { points, endTime } = record;
    const nowTime = parseInt(new Date() / 1000, 10);
    const day30 = 30 * 24 * 60 * 60 + nowTime;
    let color;
    if ((endTime && nowTime >= endTime) || points <= 0) {
      color = 'rgba(102, 102, 102, 0.5)';
    } else if (endTime && day30 > endTime) {
      color = '#d0021b';
    }
    return color;
  };

  generateColumns = () => {
    const { transformLocale } = this.props;
    return [
      {
        title: 'NO.',
        key: 'no',
        className: 'alignCenter hideOnMobile',
        render: this.renderNo,
      },
      {
        title: transformLocale(LOCALE.ACTIVITY_NAME),
        key: 'title',
        render: this.renderTitle,
      },
      {
        title: transformLocale(LOCALE.POINTS),
        dataIndex: 'points',
        className: 'alignCenter',
        render: this.renderPoints,
      },
      {
        title: transformLocale(LOCALE.STARTDATE),
        dataIndex: 'startTime',
        className: 'alignCenter',
        render: this.renderDate,
      },
      {
        title: transformLocale(LOCALE.ENDDATE),
        dataIndex: 'endTime',
        className: 'alignCenter',
        render: this.renderDate,
      },
    ];
  };

  renderNo = (value, record, index) => (
    <span style={{ color: this.getColor(record) }}>{index + 1}</span>
  );

  renderTitle = (value, record) => {
    const { transformLocale } = this.props;
    const { activity, title, note } = record;

    let name;
    if (title) {
      name = title;
    } else if (note) {
      name = note;
    } else if (activity) {
      name = transformLocale(activity);
    } else {
      name = transformLocale(LOCALE.OTHER);
    }

    return <span style={{ color: this.getColor(record) }}>{name}</span>;
  };

  renderPoints = (value, record) => {
    const { transformCurrency } = this.props;
    return (
      <span style={{ color: this.getColor(record) }}>
        {transformCurrency(value)}
      </span>
    );
  };

  renderDate = (value, record) => (
    <span style={{ color: this.getColor(record) }}>
      {value ? moment.unix(value).format('YYYY/MM/DD') : '-'}
    </span>
  );

  render() {
    const {
      colors,
      userPoints,
      transformLocale,
      transformCurrency,
    } = this.props;
    const nowTime = parseInt(new Date() / 1000, 10);
    const total = userPoints.reduce((pre, cur) => {
      const { endTime, points } = cur;
      if (endTime && endTime <= nowTime) return pre;
      return pre + points;
    }, 0);

    return (
      <StyleRoot className="member-points" style={styles.root}>
        <Style scopeSelector=".member-points" rules={styles.Style(colors)} />
        <StyleRoot style={styles.total(colors)}>
          {transformLocale(LOCALE.CURRENT_POINTS) + transformCurrency(total)}
        </StyleRoot>
        <Table
          rowKey="id"
          columns={this.generateColumns()}
          dataSource={userPoints}
          pagination={false}
        />
      </StyleRoot>
    );
  }
}
