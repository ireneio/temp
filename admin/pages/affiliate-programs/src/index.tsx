// typescript import
import { NextPage } from 'next';
import { RangePickerDateProps } from 'antd/lib/date-picker/generatePicker';

// import
import React, { useState } from 'react';
import { filter } from 'graphql-anywhere';
import { Button, Input } from 'antd';
import { formatRFC3339 } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import Header from '@admin/header';
import DatePicker from '@admin/date-picker';
import Table from '@admin/table';

import Empty from './Empty';
import styles from './styles/index.less';
import useGetAffiliatePrograms from './hooks/useGetAffiliatePrograms';
import useProgramsColumns from './hooks/useProgramsColumns';

// graphql typescript
import { useProgramsColumnsFragment as useProgramsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { useProgramsColumnsFragment } from './gqls/useProgramsColumns';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;

const AffiliatePrograms: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('affiliate-programs');
  const columns = useProgramsColumns();
  const {
    loading,
    refetch,
    affiliatePrograms,
    affiliateProgramsStatus,
    current,
    onChange,
  } = useGetAffiliatePrograms();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [date, setDate] = useState<RangePickerDateProps<Date>['value']>();

  return (
    <Header
      title={t('title')}
      link={{
        text: t('instruction'),
        url: '',
      }}
      buttons={
        <Link href="/affiliate/partners">
          <Button className={styles.partners}>{t('manage-partners')}</Button>
        </Link>
      }
    >
      <Table<useProgramsColumnsFragmentType>
        className={`${styles.affiliatePrograms} ${
          affiliateProgramsStatus === 'HAS_PROGRAMS' ? '' : styles.empty
        }`}
        loading={loading}
        dataSource={filter(
          useProgramsColumnsFragment,
          (affiliatePrograms?.edges || []).slice(
            current * 10,
            (current + 1) * 10,
          ),
        )}
        columns={columns}
        pagination={{
          total: affiliatePrograms?.total || 0,
          current,
          pageSizeOptions: [],
          onChange,
        }}
        locale={{ emptyText: t('not-match') }}
        rowClassName={styles.rowClassName}
        rowKey={({ node: { id } }) => id}
      >
        <div
          className={`${styles.root} ${
            affiliateProgramsStatus === 'HAS_PROGRAMS' ? '' : styles.empty
          }`}
        >
          <Search
            placeholder={t('search')}
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
            onSearch={value => {
              refetch({
                filter: { searchTerm: value },
              });
              setSearchTerm(value);
            }}
          />

          <DatePicker
            className={styles.datePicker}
            value={date}
            onChange={value => {
              const [startAt, endAt] = value || [];

              refetch({
                filter: {
                  startAt: !startAt ? null : formatRFC3339(startAt),
                  endAt: !endAt ? null : formatRFC3339(endAt),
                },
              });
              setDate(value);
            }}
          />

          <Button
            type="link"
            onClick={() => {
              refetch({ filter: null });
              setDate([null, null]);
            }}
          >
            {t('clear')}
          </Button>

          <div className={styles.space} />

          {affiliateProgramsStatus === 'NO_PARTNERS' ? null : (
            <Link href="/affiliate/programs/add">
              <Button type="primary">{t('add')}</Button>
            </Link>
          )}
        </div>

        {affiliateProgramsStatus === 'HAS_PROGRAMS' ? null : (
          <Empty affiliateProgramsStatus={affiliateProgramsStatus} />
        )}
      </Table>
    </Header>
  );
});

AffiliatePrograms.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default AffiliatePrograms;
