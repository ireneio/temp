export default ({ type, message, stack }) => {
  fetch('/log', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      data: {
        type,
        message,
        stack,
        pathname: window.location.pathname,
        userAgent: window.navigator.userAgent,
      },
    }),
  });
};
