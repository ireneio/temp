// typescript import
import { DrawerProps } from 'antd/lib/drawer';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Spin, Icon, Drawer, Select, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useOrderExport from './hooks/useOrderExport';
import styles from './styles/index.less';

// graphql typescript
import { RequestExportFileInput } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType
  extends FormComponentProps,
    Omit<DrawerProps, 'visible' | 'closable' | 'title' | 'onClose'> {
  visible: boolean;
  onClose?: () => void;
}

// definition
const { Option } = Select;

export default Form.create<PropsType>()(
  React.memo(
    ({
      visible,
      onClose,
      className,
      form: { getFieldDecorator, getFieldValue, validateFields },
      ...props
    }: PropsType) => {
      const { t } = useTranslation('orders-export');
      const {
        loading,
        options,
        exportStatus,
        requestExportFile,
      } = useOrderExport();

      return (
        <Drawer
          {...props}
          visible={visible}
          title={
            <div className={styles.title}>
              <span>{t('title')}</span>

              <span>
                <Button onClick={onClose}>{t('go-back')}</Button>

                {!getFieldValue('exportFormatId') ||
                !getFieldValue('fileType') ? null : (
                  <Button
                    loading={exportStatus === 'PROCESSING'}
                    onClick={() => {
                      validateFields(
                        (errors, { exportFormatId, fileType, fileName }) => {
                          if (!errors) {
                            requestExportFile({
                              input: {
                                dataType: 'ORDER' as RequestExportFileInput['dataType'],
                                exportFormatId,
                                fileType,
                                fileName,
                              },
                            });
                          }
                        },
                      );
                    }}
                    type="primary"
                  >
                    {t('download')}
                  </Button>
                )}
              </span>
            </div>
          }
          className={`${styles.root} ${className}`}
          onClose={onClose}
          closable={false}
        >
          {loading ? (
            <Spin indicator={<Icon type="loading" spin />} />
          ) : (
            ['exportFormatId', 'fileType', 'fileName'].map(key => (
              <div key={key} className={styles.content}>
                <span>{t(`${key}.title`)}</span>

                <span>
                  {getFieldDecorator(`${key}`)(
                    options[key] ? (
                      <Select placeholder={t(`${key}.placeholder`)}>
                        {options[key].map(
                          ({
                            id,
                            name,
                          }: {
                            id: string | null;
                            name: string | null;
                          }) => (
                            <Option key={id || 'null-id'}>{name}</Option>
                          ),
                        )}
                      </Select>
                    ) : (
                      <Input placeholder={t(`${key}.placeholder`)} />
                    ),
                  )}
                </span>
              </div>
            ))
          )}
        </Drawer>
      );
    },
  ),
);
