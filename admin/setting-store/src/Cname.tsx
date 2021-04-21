// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Divider, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';
import {
  adminSettingStoreStoreDescription,
  adminSettingStoreStoreLogo_h39 as adminSettingStoreStoreLogo,
  adminSettingStoreMobileStoreLogo_h70 as adminSettingStoreMobileStoreLogo,
  adminSettingStoreStoreFavicon_h41 as adminSettingStoreStoreFavicon,
} from '@meepshop/images';

import ImageInput from './ImageInput';
import styles from './styles/cname.less';

// graphql typescript
import { cnameFragment as cnameFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  setting: cnameFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(
  ({ form: { getFieldDecorator }, setting }: PropsType) => {
    const { t } = useTranslation('setting-store');

    return (
      <>
        <div className={styles.notEditableLabel}>
          {t('store-info.store-cname')}
        </div>
        <div className={styles.notEditableValue}>{setting?.cname}</div>

        <Divider />

        <div className={styles.label}>{t('store-info.store-name')}</div>
        <FormItem>
          {getFieldDecorator('name', {
            initialValue: setting?.description?.name,
            rules: [
              {
                required: true,
                message: t('store-info.store-name-is-required'),
              },
            ],
            validateTrigger: 'onBlur',
          })(<Input />)}
        </FormItem>

        <div className={styles.label}>
          {t('store-info.store-description')}
          <Tooltip
            iconClassName={styles.questionIcon}
            placement="top"
            title={
              <div className={styles.tooltip}>
                <img
                  className={styles.tooltipImg}
                  src={adminSettingStoreStoreDescription}
                  alt={t('store-info.store-introduction-tip-1')}
                />
                <div>{t('store-info.store-introduction-tip-1')}</div>
                <br />
                <div>{t('store-info.store-introduction-tip-2')}</div>
              </div>
            }
          />
        </div>
        <FormItem>
          {getFieldDecorator('introduction', {
            initialValue: setting?.description?.introduction,
          })(
            <TextArea
              placeholder={t('store-info.store-introduction-placeholder')}
              rows={4}
            />,
          )}
        </FormItem>

        <div className={styles.flexBetween}>
          <div>
            <div className={styles.label}>
              {t('store-info.store-logo')}
              <Tooltip
                iconClassName={styles.questionIcon}
                title={
                  <div className={styles.content}>
                    <img
                      src={adminSettingStoreStoreLogo}
                      alt={t('store-info.store-logo')}
                    />
                    <ul>
                      <li>
                        <span>{t('store-info.store-logo-tip-1')}</span>
                        <p>{t('store-info.store-logo-tip-2')}</p>
                      </li>
                      <li>
                        <span>{t('store-info.store-logo-tip-3')}</span>
                        <p>{t('store-info.store-logo-tip-4')}</p>
                      </li>
                      <li>
                        <span>{t('store-info.store-logo-tip-5')}</span>
                        <p>svg, png, gif, jpg</p>
                      </li>
                    </ul>
                  </div>
                }
              />
            </div>
            <FormItem>
              {getFieldDecorator('logo', {
                initialValue: setting?.logoImage,
              })(<ImageInput />)}
            </FormItem>
          </div>
          <div>
            <div className={styles.label}>
              {t('store-info.mobile-store-logo')}
              <Tooltip
                iconClassName={styles.questionIcon}
                title={
                  <div className={styles.content}>
                    <img
                      src={adminSettingStoreMobileStoreLogo}
                      alt={t('store-info.mobile-store-logo')}
                    />
                    <ul>
                      <li>
                        <span>{t('store-info.store-logo-tip-1')}</span>
                        <p>{t('store-info.mobile-store-logo-tip')}</p>
                      </li>
                      <li>
                        <span>{t('store-info.store-logo-tip-5')}</span>
                        <p>svg, png, gif, jpg</p>
                      </li>
                    </ul>
                  </div>
                }
              />
            </div>
            <FormItem>
              {getFieldDecorator('mobileLogo', {
                initialValue: setting?.mobileLogoImage,
              })(<ImageInput />)}
            </FormItem>
          </div>
          <div>
            <div className={styles.label}>
              {t('store-info.website-icon')}
              <Tooltip
                iconClassName={styles.questionIcon}
                placement="topRight"
                title={
                  <div className={styles.content}>
                    <img
                      src={adminSettingStoreStoreFavicon}
                      alt={t('store-info.website-icon')}
                    />
                    <p>{t('store-info.website-icon-tip-3')}</p>
                    <ul>
                      <li>
                        <span>{t('store-info.store-logo-tip-1')}</span>
                        <p>{t('store-info.website-icon-tip-1')}</p>
                        <p>{t('store-info.website-icon-tip-2')}</p>
                      </li>
                      <li>
                        <span>{t('store-info.store-logo-tip-5')}</span>
                        <p>ico, png, gif, jpg</p>
                      </li>
                    </ul>
                  </div>
                }
              />
            </div>
            <FormItem>
              {getFieldDecorator('favicon', {
                initialValue: setting?.faviconImage,
              })(<ImageInput />)}
            </FormItem>
          </div>
        </div>
      </>
    );
  },
);
