// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { areEqual } from 'fbjs';
import moment from 'moment';

import { withTranslation } from '@admin/utils/lib/i18n';

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
        newState.value = [moment().startOf('day'), moment().endOf('day')];
        break;

      case 'yesterday':
        newState.value = [
          moment()
            .subtract(1, 'days')
            .startOf('day'),
          moment()
            .subtract(1, 'days')
            .endOf('day'),
        ];
        break;

      case 'lastWeek':
        newState.value = [
          moment()
            .subtract(1, 'weeks')
            .startOf('week')
            .startOf('day'),
          moment()
            .subtract(1, 'weeks')
            .endOf('week')
            .endOf('day'),
        ];
        break;

      case 'lastMonth':
        newState.value = [
          moment()
            .subtract(1, 'months')
            .startOf('month')
            .startOf('day'),
          moment()
            .subtract(1, 'months')
            .endOf('month')
            .endOf('day'),
        ];
        break;

      case 'last7Days':
        newState.value = [
          moment()
            .subtract(6, 'days')
            .startOf('day'),
          moment().endOf('day'),
        ];
        break;

      case 'last30Days':
        newState.value = [
          moment()
            .subtract(29, 'days')
            .startOf('day'),
          moment().endOf('day'),
        ];
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
        className={styles.root}
        value={value}
        dropdownClassName={`${styles.dropdown} ${
          type === 'custom' ? '' : styles.notCustom
        }`}
        placeholder={[t('start-date'), t('end-date')]}
        onChange={originalNewValue => {
          if (
            originalNewValue &&
            originalNewValue.some(
              (time: moment.Moment | null | undefined) => !time,
            )
          )
            return;

          const newValue = [
            !originalNewValue[0]
              ? undefined
              : originalNewValue[0].startOf('day'),
            !originalNewValue[1] ? undefined : originalNewValue[1].endOf('day'),
          ];

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

export default withTranslation('date-picker')(DatePicker);
