const SHOW_LOADING_STATUS = 'SHOW_LOADING_STATUS';

export const showLoadingStatus = (message = '') => ({
  type: SHOW_LOADING_STATUS,
  payload: message,
});

const HIDE_LOADING_STATUS = 'HIDE_LOADING_STATUS';

export const hideLoadingStatus = () => ({
  type: HIDE_LOADING_STATUS,
  payload: '',
});

const initialState = {
  loading: false,
  loadingTip: '',
};

export default function(state = initialState, { type, payload }) {
  console.log(type);

  if (type.match(/_REQUEST/)) {
    console.log('is request');
    return {
      loading: true,
      loadingTip: type,
    };
  }

  if (type.match(/_SUCCESS|_FAILURE/)) {
    console.log('is success/failure');
    return {
      loading: false,
      loadingTip: '',
    };
  }

  switch (type) {
    case SHOW_LOADING_STATUS: {
      return {
        loading: true,
        loadingTip: payload,
      };
    }
    case HIDE_LOADING_STATUS: {
      return {
        loading: false,
        loadingTip: '',
      };
    }
    default:
      return state;
  }
}
