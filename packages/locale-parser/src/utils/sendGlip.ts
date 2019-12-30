// import
import fetch from 'node-fetch';

// definition
const HOOK_URL =
  'https://hooks.glip.com/webhook/a86a81ec-fbd0-4a7c-8f34-2135d18d1309';
const BOT_IMAGE_URL =
  'https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png';

export default (message: string): Promise<null> =>
  fetch(HOOK_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      icon: BOT_IMAGE_URL,
      activity: 'locale bot',
      title: message,
    }),
  })
    .then(res => res.json())
    .then(({ status, message: errorMessage }) => {
      if (status === 'OK') return null;

      return fetch(HOOK_URL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          icon: BOT_IMAGE_URL,
          activity: 'locale bot',
          title: errorMessage,
        }),
      }).then(() => null);
    });
