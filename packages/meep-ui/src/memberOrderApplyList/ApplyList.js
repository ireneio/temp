import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ID_TYPE } from 'constants/propTypes';

import * as styles from './styles/applyList';
import * as locale from './locale';

@enhancer
@radium
export default class ApplyList extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    applyList: PropTypes.arrayOf(
      PropTypes.shape({
        orderApply: PropTypes.shape({
          id: ID_TYPE.isRequired,
          applicationType: PropTypes.string.isRequired,
          createdOn: PropTypes.number.isRequired,
          recipient: PropTypes.shape({
            name: PropTypes.string.isRequired,
            mobile: PropTypes.string.isRequired,
            address: PropTypes.shape({
              streetAddress: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
          applicationInfo: PropTypes.shape({
            comment: PropTypes.string.isRequired,
          }).isRequired,
          quantity: PropTypes.number.isRequired,
          status: PropTypes.number.isRequired,
          applicationStatus: PropTypes.number.isRequired,
        }).isRequired,
        orderDetails: PropTypes.shape({
          galleryInfo: PropTypes.shape({
            mainId: PropTypes.string,
            media: PropTypes.arrayOf(PropTypes.string),
          }),
          title: PropTypes.shape({}).isRequired,
          specs: PropTypes.arrayOf(PropTypes.shape({})),
        }).isRequired,
      }),
    ).isRequired,
  };

  render() {
    const { colors, transformLocale, applyList } = this.props;
    const { applicationType, createdOn, recipient } = applyList[0].orderApply;

    return (
      <StyleRoot style={styles.root}>
        <div style={styles.receiverInfo}>
          <div>
            {transformLocale(locale.APPLY)} ：
            {transformLocale(locale.APPLICATION_TYPE(applicationType))}
          </div>
          <div>
            {transformLocale(locale.ORDER_APPLY_DATE)} ：
            {moment.unix(createdOn).format('YYYY/MM/DD')}
          </div>
          {applicationType === 'return' ? null : (
            <div>
              <div>
                {transformLocale(locale.RECIPIENT)} ：{recipient.name}
              </div>
              <div>
                {transformLocale(locale.PHONE)} ：{recipient.mobile}
              </div>
              <div>
                {transformLocale(locale.ADDRESS)} ：{
                  recipient.address.streetAddress
                }
              </div>
            </div>
          )}
        </div>
        <table style={styles.table({ borderColor: colors[5] })}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th('center')} width="10%" />
              <th style={styles.th('left')}>
                {transformLocale(locale.PRODUCT_NAME)}
              </th>
              <th style={styles.th('left')}>
                {transformLocale(locale.APPLICATION_TYPE(applicationType))}
                {transformLocale(locale.REASON)}
              </th>
              <th style={styles.th('center')}>
                {transformLocale(locale.QUANTITY)}
              </th>
              <th style={styles.th('center')}>
                {transformLocale(locale.APPLICATION_TYPE(applicationType))}
                {transformLocale(locale.STATUS)}
              </th>
            </tr>
          </thead>
          <tbody>
            {applyList.map(item => {
              const {
                id,
                applicationInfo,
                quantity,
                status,
                applicationStatus,
              } = item.orderApply;
              const { galleryInfo, title, specs } = item.orderDetails;

              return (
                <tr style={styles.tr({ borderColor: colors[5] })} key={id}>
                  <td style={styles.td('left')}>
                    <img
                      alt="productImage"
                      src={`//${galleryInfo.mainId ||
                        galleryInfo.media[0]}?w=80`}
                      style={styles.image}
                    />
                  </td>
                  <td style={styles.td('left')}>
                    <div>{title.zh_TW}</div>
                    <div>
                      {!specs
                        ? null
                        : specs.map(
                            (spec, index) =>
                              `${index > 0 ? ' / ' : ''}${spec.title.zh_TW}`,
                          )}
                    </div>
                    <div style={styles.comment}>{applicationInfo.comment}</div>
                  </td>
                  <td style={styles.td('left', false)}>
                    {applicationInfo.comment}
                  </td>
                  <td style={styles.td('center')}>{quantity}</td>
                  <td style={styles.td('center')}>
                    {status === 2 || status === 1 ? (
                      <div style={styles.statusText(status)}>
                        {transformLocale(
                          locale.ORDER_APPLY_STATUS(applicationType, status),
                        )}
                      </div>
                    ) : (
                      <div
                        style={styles.tag({
                          color: colors[2],
                          backgroundColor: colors[4],
                        })}
                      >
                        {applicationStatus > 0
                          ? transformLocale(
                              locale.APPLICATION_TYPE(applicationType),
                            )
                          : ''}
                        {transformLocale(
                          locale.APPLICATIN_STATUS(applicationStatus),
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyleRoot>
    );
  }
}
