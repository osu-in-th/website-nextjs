import { NextApiRequest, NextApiResponse } from 'next';

export default function initMiddleware(middleware: Function) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });
}
