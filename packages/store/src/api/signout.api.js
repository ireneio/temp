import initApollo from '@meepshop/apollo/lib/initApollo';

export default async () => {
  const res = await fetch('/signout', {
    method: 'get',
    credentials: 'same-origin',
  });

  if (res.status < 400) {
    // FIXME: should signout with apollo
    initApollo({ name: 'store' }).resetStore();
    window.sessionStorage.clear();
    return true;
  }

  return false;
};
