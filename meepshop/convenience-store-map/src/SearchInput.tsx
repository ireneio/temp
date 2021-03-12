// typescript import
import { I18nPropsType } from '@meepshop/locales';

// import
import React from 'react';
import { Input, Button } from 'antd';

import { withTranslation } from '@meepshop/locales';

import styles from './styles/searchInput.less';

// typescript definition
interface PropsType extends I18nPropsType {
  searchKey: string;
  label: string;
  filterConvenienceStores: (input: {}) => void;
}

// definition
class SearchInput extends React.PureComponent<PropsType> {
  public state = {
    inputContent: '',
  };

  private filterConvenienceStores = (): void => {
    const { searchKey, filterConvenienceStores } = this.props;
    const { inputContent } = this.state;

    filterConvenienceStores({ [searchKey]: inputContent });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      label,
    } = this.props;
    const { inputContent } = this.state;

    return (
      <div className={styles.root}>
        <div>{label}</div>
        <Input
          value={inputContent}
          onChange={e => this.setState({ inputContent: e.target.value })}
        />
        <Button type="primary" onClick={this.filterConvenienceStores}>
          {t('searchStore')}
        </Button>
      </div>
    );
  }
}

export default withTranslation('convenience-store-map')(SearchInput);
