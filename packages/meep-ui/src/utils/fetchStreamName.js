export default async items => {
  const link = `//street-name.meepstage.com/list/${items
    .map(value =>
      encodeURIComponent(
        value === 'Taiwan' ? '台灣' : value.replace(/台/, '臺'),
      ),
    )
    .join('/')}`;
  // TODO: modified street API
  const data = await fetch(link).then(res => res.json() || { zip: '' });

  return data;
};
