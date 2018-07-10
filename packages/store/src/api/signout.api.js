export default async function() {
  const res = await fetch('/signout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({}),
  });
  let data;
  if (res.status < 400) {
    data = { msg: 'success' };
  } else {
    data = {
      msg: 'failure',
      error: { status: res.status, errMsg: res.statusText },
    };
  }
  return data;
}
