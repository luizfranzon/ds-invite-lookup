import type { NextApiRequest, NextApiResponse } from 'next'
import { getInvite } from 'discord-inv'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = typeof req.query.code === 'string' ? req.query.code : ''

  getInvite(code)
    .then((invite) => {
      res.status(200).json({ name: invite })
    })
    .catch((error) => {
      error.code
        ? res.status(200).json({ error: 'Convite desconhecido' })
        : res.status(200).json({ error: 'Erro desconhecido' })
    })
}
