import parseIframe from './parseIframe';

export default href => {
  if (/src=['"](goo.gl\/9GMZTT)/.test(href))
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.925095587325!2d121.565033515361!3d25.03661594433973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzExLjgiTiAxMjHCsDM0JzAyLjAiRQ!5e0!3m2!1szh-TW!2stw!4v1589609009934!5m2!1szh-TW!2stw';

  if (href === 'https://goo.gl/maps/tM51Z2KcqWMVtTvS9')
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.0832916267814!2d121.0130237150015!3d24.792601284085915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34683640a6a44045%3A0x64396db656b56b20!2zMzAw5paw56u55biC5p2x5Y2A5oWI5r-f6LevMjU16Jmf!5e0!3m2!1szh-TW!2stw!4v1616547266273!5m2!1szh-TW!2stw';

  if (/<iframe/.test(href) || /^http/.test(href)) return parseIframe(href);

  return `https://www.google.com/maps/embed?pb=${href}`;
};
