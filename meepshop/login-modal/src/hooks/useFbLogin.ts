// import
import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { AdTrack as AdTrackContext, Fb as FbContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  fbLoginInModal as fbLoginInModalType,
  fbLoginInModalVariables as fbLoginInModalVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { fbLoginInModal } from '../gqls/useFbLogin';

// definition
export default (
  onClose?: () => void,
): {
  fbLogin: () => void;
  loading: boolean;
} => {
  const dispatch = useDispatch();
  const adTrack = useContext(AdTrackContext);
  const { fb, appId, version } = useContext(FbContext);
  const { push, domain, asPath } = useRouter();
  const { t } = useTranslation('login-modal');
  const [mutation, { loading }] = useMutation<
    fbLoginInModalType,
    fbLoginInModalVariablesType
  >(fbLoginInModal, {
    onCompleted: ({ fbLogin: { status } }) => {
      switch (status) {
        case 'OK':
          // FIXME: remove after redux is gone
          dispatch('CLEAN_PRODUCT');
          if (onClose) onClose();
          break;

        case 'FIRST_LOGIN':
          adTrack.completeRegistration();
          // FIXME: remove after redux is gone
          dispatch('CLEAN_PRODUCT');
          if (onClose) onClose();
          break;

        default:
          notification.error({ message: status });
          break;
      }
    },
  });

  return {
    fbLogin: useCallback(() => {
      if (!appId || !fb) {
        notification.error({
          message: t('no-fb-app-id'),
        });
        return;
      }

      if (/(Line|Instagram|FBAN|FBAV)/gm.test(window.navigator.userAgent)) {
        push(
          `https://www.facebook.com/${version}/dialog/oauth?client_id=${appId}&redirect_uri=https://${domain}/fbAuthForLine&scope=email&state=${asPath}`,
        );
      } else {
        fb.login(
          async response => {
            if (response.status === 'connected') {
              mutation({
                variables: {
                  input: { accessToken: response.authResponse.accessToken },
                },
              });
            } else {
              notification.error({
                message:
                  'The person is not logged into this app or we are unable to tell.',
              });
            }
          },
          { scope: 'public_profile,email' },
        );
      }
    }, [appId, domain, fb, mutation, asPath, push, t, version]),
    loading,
  };
};
