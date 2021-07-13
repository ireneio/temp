// typescript import
import { IncomingMessage, ServerResponse } from 'http';
import { NextPageContext } from 'next';

// import
import helmet from 'helmet';
import { parse, serialize } from 'cookie';

// typescript definition
export interface CustomCtx extends NextPageContext {
  req: IncomingMessage & {
    cookies: { [key: string]: string | undefined };
  };
  res: ServerResponse & {
    cookie: (...args: Parameters<typeof serialize>) => void;
  };
}

// definition
export default async ({ req, res }: CustomCtx): Promise<void> => {
  if (typeof window === 'undefined' && req && res) {
    await new Promise<void>((resolve, reject) => {
      helmet({
        contentSecurityPolicy: false,
      })(req, res, err => (err ? reject(err) : resolve()));
    });

    req.cookies = parse(req.headers.cookie || '');
    res.cookie = (...args) => res.setHeader('Set-Cookie', serialize(...args));
  }
};
