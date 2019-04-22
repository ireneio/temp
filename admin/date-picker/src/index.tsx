// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { areEqual } from 'fbjs';
import moment from 'moment';

import { withNamespaces } from '@admin/utils/lib/i18n';

import styles from './styles/index.less';

// typescript definition
export interface PropsType extends I18nPropsType {
  value?: [moment.Moment, moment.Moment];
  onChange?: (value: PropsType['value']) => void;
}

interface StateType {
  type?:
    | 'today'
    | 'yesterday'
    | 'lastWeek'
    | 'lastMonth'
    | 'last7Days'
    | 'last30Days'
    | 'custom';
  value?: PropsType['value'];
}

// definition
const { RangePicker } = AntdDatePicker;

class DatePicker extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {};

  public static getDerivedStateFromProps(
    nextProps: PropsType,
    prevState: StateType,
  ): Pick<StateType, 'value'> | null {
    if (nextProps.onChange && !areEqual(nextProps.value, prevState.value))
      return {
        value: nextProps.value,
      };

    return null;
  }

  private changeType = (key: StateType['type']) => (): void => {
    const { onChange } = this.props;
    const newState: StateType = { type: key };

    switch (key) {
      case 'today':
        newState.value = [moment(), moment()];
        break;

      case 'yesterday':
        newState.value = [
          moment().subtract(1, 'days'),
          moment().subtract(1, 'days'),
        ];
        break;

      case 'lastWeek':
        newState.value = [
          moment()
            .subtract(1, 'weeks')
            .startOf('week'),
          moment()
            .subtract(1, 'weeks')
            .endOf('week'),
        ];
        break;

      case 'lastMonth':
        newState.value = [
          moment()
            .subtract(1, 'months')
            .startOf('month'),
          moment()
            .subtract(1, 'months')
            .endOf('month'),
        ];
        break;

      case 'last7Days':
        newState.value = [moment().subtract(6, 'days'), moment()];
        break;

      case 'last30Days':
        newState.value = [moment().subtract(29, 'days'), moment()];
        break;

      default:
        break;
    }

    this.setState(newState, () => {
      if (onChange && newState.value) onChange(newState.value);
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      onChange,
    } = this.props;
    const { type, value } = this.state;

    return (
      <RangePicker
        value={value}
        dropdownClassName={`${styles.root} ${
          type === 'custom' ? '' : styles.notCustom
        }`}
        placeholder={[t('start-date'), t('end-date')]}
        onChange={newValue => {
          if (newValue && newValue.some(time => !time)) return;

          this.setState({ value: newValue } as Pick<PropsType, 'value'>, () => {
            if (onChange) onChange(newValue as PropsType['value']);
          });
        }}
        renderExtraFooter={() =>
          [
            'today',
            'yesterday',
            'lastWeek',
            'lastMonth',
            'last7Days',
            'last30Days',
            'custom',
          ].map((key: Required<StateType>['type']) => (
            <div
              key={key}
              className={`ant-select-dropdown-menu-item ${
                type !== key ? '' : 'ant-select-dropdown-menu-item-selected'
              }`}
              onClick={this.changeType(key)}
            >
              {t(key as string)}
            </div>
          ))
        }
      />
    );
  }
}

export default withNamespaces('date-picker')(DatePicker);
