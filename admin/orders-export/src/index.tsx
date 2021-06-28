// typescript import
import { DrawerProps } from 'antd/lib/drawer';

// import
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Spin, Drawer, Select, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useOrderExport from './hooks/useOrderExport';
import styles from './styles/index.less';

// typescript definition
interface PropsType
  extends Omit<DrawerProps, 'visible' | 'closable' | 'title' | 'onClose'> {
  visible: boolean;
  onClose?: () => void;
  selectedIds: string[];
}

// definition
const { Option } = Select;
const { Item: FormItem } = Form;

export default React.memo(
  ({ visible, onClose, className, selectedIds, ...props }: PropsType) => {
    const { t } = useTranslation('orders-export');
    const {
      loading,
      options,
      exportStatus,
      requestExportFile,
    } = useOrderExport(selectedIds);

    return (
      <Form onFinish={requestExportFile}>
        <Drawer
          {...props}
          visible={visible}
          title={
            <div className={styles.title}>
              <span>{t('title')}</span>

              <span>
                <Button onClick={onClose}>{t('go-back')}</Button>

                <FormItem shouldUpdate noStyle>
                  {({ getFieldValue, submit }) =>
                    !getFieldValue(['exportFormatId']) ||
                    !getFieldValue(['fileType']) ? null : (
                      <Button
                        loading={exportStatus === 'PROCESSING'}
                        onClick={submit}
                        type="primary"
                      >
                        {t('download')}
                      </Button>
                    )
                  }
                </FormItem>
              </span>
            </div>
          }
          className={`${styles.root} ${className}`}
          onClose={onClose}
          closable={false}
        >
          {loading ? (
            <Spin indicator={<LoadingOutlined spin />} />
          ) : (
            ['exportFormatId', 'fileType', 'fileName'].map(key => (
              <div key={key} className={styles.content}>
                <span>{t(`${key}.title`)}</span>

                <span>
                  <FormItem name={key} noStyle>
                    {options[key] ? (
                      <Select placeholder={t(`${key}.placeholder`)}>
                        {options[key].map(
                          ({
                            id,
                            name,
                          }: {
                            id: string | null;
                            name: string | null;
                          }) => (
                            <Option
                              key={id || 'null-id'}
                              value={id || 'null-value'}
                            >
                              {name}
                            </Option>
                          ),
                        )}
                      </Select>
                    ) : (
                      <Input placeholder={t(`${key}.placeholder`)} />
                    )}
                  </FormItem>
                </span>
              </div>
            ))
          )}
        </Drawer>
      </Form>
    );
  },
);
