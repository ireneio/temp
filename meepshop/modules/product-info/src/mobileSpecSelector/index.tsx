// typescript import
import { PropsType as AddButtonPropsType } from './AddButton';

// import
import React, { useContext } from 'react';
import { Drawer } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import Title from './Title';
import AddButton from './AddButton';
import styles from './styles/index.less';

// graphql typescript
import {
  mobileSpecSelectorProductFragment,
  mobileSpecSelectorVariantFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { titleProductFragment, titleVariantFragment } from './gqls/title';
import { addButtonFragment } from './gqls/addButton';

// typescript definition
export interface PropsType extends AddButtonPropsType {
  product: mobileSpecSelectorProductFragment;
  variant: mobileSpecSelectorVariantFragment | null;
  visible: boolean;
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({ product, variant, visible, onClose, children, ...props }: PropsType) => {
    const colors = useContext(ColorsContext);

    return (
      <>
        <Drawer
          className={styles.root}
          title={
            <Title
              product={filter(titleProductFragment, product)}
              variant={filter(titleVariantFragment, variant)}
            />
          }
          visible={visible}
          onClose={onClose}
          placement="bottom"
        >
          <div className={styles.specs}>{children}</div>

          <AddButton
            {...props}
            variant={filter(addButtonFragment, variant)}
            onClose={onClose}
          />
        </Drawer>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root},
              .${styles.root} .ant-drawer-title,
              .${styles.root} .ant-drawer-close {
                color: ${colors[3]};
              }

              .${styles.root} .ant-drawer-content,
              .${styles.root} .ant-drawer-header {
                background-color: ${colors[0]};
              }

              .${styles.root} .ant-drawer-content-wrapper {
                height: ${
                  product.specs?.length || 0 < 2 ? '60%' : '75%'
                } !important;
              }
            `,
          }}
        />
      </>
    );
  },
);
