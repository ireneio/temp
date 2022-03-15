// import
import uaParser from 'ua-parser-js';

// definition
export default (req, res) => {
  const {
    browser,
    engine,
    os,
    device: { type = 'desktop', model = '', vendor = 'unknown' },
  } = uaParser(req.headers['user-agent']);

  res.setHeader('content-type', 'text/html');
  res.end(
    `
      <header>Welcome to next-store ${process.env.NEXT_PUBLIC_VERSION}</header>
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
