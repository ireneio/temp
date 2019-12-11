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
  switch (type) {
    case HIDE_LOADING_STATUS:
    case 'AUTH_SUCCESS':
      return {
        loading: false,
        loadingTip: '',
      };
    case SHOW_LOADING_STATUS:
      return {
        loading: true,
        loadingTip: payload,
      };
    default:
      return state;
  }
}
