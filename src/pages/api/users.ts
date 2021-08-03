import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {

  const users = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Deacon' },
    { id: '3', name: 'Bryan' },
    { id: '4', name: 'May' }
  ]

  return response.json(users)
}
