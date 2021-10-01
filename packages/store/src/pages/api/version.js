// import
import uaParser from 'ua-parser-js';
import getConfig from 'next/config';

// definition
const {
  publicRuntimeConfig: { VERSION },
} = getConfig();

export default (req, res) => {
  const {
    browser,
    engine,
    os,
    device: { type = 'desktop', model = '', vendor = 'unknown' },
  } = uaParser(req.headers['user-agent']);

  // FIXME: remove after express is removed
  res.setHeader('content-type', 'text/html');
  res.end(
    `
      <header>Welcome to next-store ${VERSION}</header>
      <main>
        Your information:
          <ul>
            <li>Browser: ${browser.name}(${browser.version})</li>
            <li>Engine: ${engine.name}</li>
            <li>OS: ${os.name}(${os.version})</li>
            <li>Device: ${type} - ${model}(${vendor})</li>
          </ul>
      </main>
    `,
  );
};