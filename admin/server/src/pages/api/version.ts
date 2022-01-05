// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

// import
import uaParser from 'ua-parser-js';

// definition
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    browser,
    engine,
    os,
    device: { type = 'desktop', model = '', vendor = 'unknown' },
  } = uaParser(req.headers['user-agent']);

  res.end(
    `
      <header>Welcome to next-admin ${process.env.NEXT_PUBLIC_VERSION}</header>
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
