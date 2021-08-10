import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('SOMETHING GOT HOOKED')
  res.status(200).json({ ok: true })
}
