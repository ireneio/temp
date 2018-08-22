export default async function({ email, password }) {
  try {
    const res = await fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    });
    let data;
    if (res.status === 200) {
      data = await res.json();
    } else {
      throw new Error(`login.api => ${res.status}: ${res.statusText}`);
    }
    return data;
  } catch (error) {
    return { error: error.message };
  }
}
