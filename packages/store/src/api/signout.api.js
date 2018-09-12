export default async function() {
  const res = await fetch('/signout', {
    method: 'get',
    credentials: 'same-origin',
  });
  if (res.status < 400) return true;
  return false;
}
