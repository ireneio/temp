import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'server/routes';

import { withTranslation } from '@meepshop/utils/lib/i18n';

const ProductDiscontinued = ({ t, productName }) => (
  <div
    style={{
      zIndex: 999,
      position: 'fixed',
      backgroundColor: '#eee',
      color: '#9e9e9e',
      fontSize: 20,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* meepShop Wizard image */}
    <svg width="100" height="150" viewBox="0 0 184 240">
      <g fill="none" fillRule="evenodd">
        <g fill="#9E9E9E">
          <path d="M108.286 204.253c5.952 1.68 10.796 4.221 14.641 8.556-1.76-4.655-4.98-8.176-9.426-10.008-4.633-1.909-9.562-3.266-14.483-4.276-7.138-1.466-14.382-2.298-21.71-1.19-5.512.833-10.435 2.84-14.221 7.015-3.792 4.181-2.933 8.178 2.338 10.054 2.554.91 5.435.88 8.139 1.417 1.454.29 2.997.635 4.236 1.387 2.23 1.352 4.244 3.05 6.38 4.56 2.054 1.456 4.147 2.857 6.435 4.427-.643.497-1.085.934-1.608 1.234-12.12 6.97-24.914 8.611-38.31 4.505-7.408-2.27-10.571-7.795-8.86-15.41 2.199-9.786 7.703-17.722 14.723-24.668.767-.758 2.463-1.194 3.533-.947 13.153 3.042 26.51 2.753 39.83 2.313 6.916-.228 13.792-1.515 20.703-2.131 1.391-.123 3.17.218 4.242 1.035 6.608 5.023 12.148 10.972 14.74 19.08 3.66 11.456-2.172 20.61-14.095 22.004-7.792.91-15.059-.977-22.223-4.773 5.01-7.471 8.062-15.015 4.996-24.184m-19.863 14.49c-3.443-2.332-6.682-4.677-10.086-6.752-1.297-.79-2.95-1.111-4.485-1.37-1.596-.267-3.284-.014-4.867-.32-3.09-.599-3.517-2.059-1.407-4.294 3.167-3.357 7.1-5.242 11.686-5.348 3.904-.09 7.826.187 11.724.493.723.057 1.693.873 2.01 1.579 2.463 5.484.581 12.064-4.575 16.011m9.723 6.631c-2.505-1.199-4.823-2.783-7.476-4.38 5.12-5.181 6.999-10.585 6.165-16.877-.227-1.713.506-2.237 2.071-1.968 1.284.22 2.56.488 3.847.68 2.012.302 2.942 1.572 3.213 3.456.973 6.8-.686 12.934-4.942 18.296-.52.653-2.178 1.128-2.878.793M27.936 172c-14.35-8.775-21.781-21.707-22.754-38.354-1.229-21.038 4.94-39.991 17.067-56.994C26.635 70.5 32.746 65.93 39.53 62.43c12.663-6.533 26.145-10.134 40.332-11.327 17.326-1.458 34.203.55 50.941 5.266 15.647 4.408 27.074 13.537 34.853 27.613 7.82 14.15 12.809 29.046 12.818 45.372.01 18.184-7.717 32.165-22.926 42.1-10.714 7-22.69 10.662-35.114 13.118-1.119.222-2.315.199-3.37.58-3.958 1.432-7.255.1-10.567-2.012-5.938-3.787-10.54-8.735-13.856-14.907-.38-.709-.772-1.414-1.372-2.511-3.023 6.035-6.57 11.167-11.68 15.075l-.976.744c-4.618 3.534-9.503 4.476-15.388 3.167-12.347-2.746-24.41-6.06-35.289-12.71m103.187 64.845c3.432-.557 11.264-7.18 12.58-9.863 4.14-8.442 2.719-16.825-2.228-24.363-3.453-5.263-7.948-9.846-12.02-14.785.28-.08 1.058-.305 1.836-.527 8.177-2.327 16.147-5.183 23.566-9.393 13.196-7.486 22.87-17.876 26.607-32.907 2.845-11.447 2.282-22.961-.252-34.383-7.769-35.029-28.417-59.187-61.856-72.483-3.018-1.2-6.11-2.255-9.022-3.676-2.547-1.244-3.424-3.487-2.92-6.36.694-3.949 3.579-5.206 6.937-5.836 4.727-.89 8.83-2.84 12.089-6.435 3.983-4.396 4.847-10.8 2.11-15.832-1.092 4.992-3.08 7.763-7.035 9.823-3.945 2.054-8.153 1.95-12.442 1.714-3.927-.215-7.974-.65-11.794.013-11.456 1.988-18.746 9.368-23.418 19.543-1.051 2.287-2.5 3.705-4.764 4.496-1 .349-1.986.74-2.994 1.065-13.405 4.311-25.025 11.489-34.919 21.48C9.14 80.4-2.736 106.573.537 138.366c1.222 11.873 6.185 22.196 14.957 30.52 9.054 8.592 20.122 13.454 31.891 16.996 1.873.564 3.753 1.102 5.874 1.723-.767.801-1.223 1.262-1.662 1.739-6.138 6.674-11.191 14.005-13.96 22.74-3.503 11.048.045 20.59 10.248 24.391.478.178 7.085 2.033 9.102 2.509 9.584 2.262 18.838-.08 27.765-4.505 2.91-1.442 5.591-3.341 8.442-5.072 11.875 6.124 23.578 12.85 37.93 7.437" />
          <path d="M116.704 128.667c-2.514-.546-6.158-.927-9.5-2.14-10.201-3.703-20.25-3.62-30.49-.132-5.528 1.884-11.327 2.773-17.155 1.212-5.053-1.352-9.314-4.061-12.336-8.358-.993-1.41-1.55-3.216-1.93-4.924-.16-.716.456-2.074 1.08-2.364.646-.298 1.806.208 2.597.63.5.267.79.998 1.086 1.566 3.508 6.738 9.799 10.258 17.393 9.29 4.28-.545 8.497-1.61 12.726-2.514 9.408-2.01 18.668-1.34 27.925 1.095a43.401 43.401 0 0 0 10.152 1.402c6.583.122 11.662-2.715 14.847-8.626.457-.848.962-1.8 1.712-2.321.705-.49 2.015-.897 2.598-.558.611.358 1.06 1.73.893 2.512-.317 1.477-.91 2.996-1.765 4.242-4.494 6.555-10.95 9.541-19.833 9.988M44.861 81.711c4.779.032 8.514 3.792 8.502 8.56-.012 4.835-3.931 8.654-8.79 8.565-4.78-.088-8.347-3.845-8.292-8.733.054-4.857 3.703-8.424 8.58-8.392M138.293 81.665c4.72.047 8.522 3.926 8.478 8.652-.044 4.72-3.877 8.513-8.61 8.52-4.928.007-8.57-3.755-8.493-8.773.075-4.849 3.77-8.446 8.625-8.399" />
        </g>
        <path d="M0 1h183v240H0z" />
      </g>
    </svg>
    <div>{t('product-is-discontinued')}</div>
    <div>{productName}</div>
    <div
      style={{ fontSize: 12, textDecoration: 'underline', paddingTop: 20 }}
      onClick={() => {
        Router.push('/');
      }}
    >
      {t('back-to-homepage')}
    </div>
  </div>
);

ProductDiscontinued.propTypes = {
  productName: PropTypes.string.isRequired,
};

export default withTranslation('common')(ProductDiscontinued);
