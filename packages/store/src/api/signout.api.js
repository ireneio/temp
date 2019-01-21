import client from 'apollo/initApollo';

export default async function() {
  const res = await fetch('/signout', {
    method: 'get',
    credentials: 'same-origin',
  });

  if (res.status < 400) {
    // FIXME: should signout with apollo
    client().clearStore();
    return true;
  }

  return false;
}
