import { NextApiRequest, NextApiResponse } from 'next'

export const tasks = [
  {
    id: 1,
    text: '寝る',
    isFinished: true,
  },
  {
    id: 2,
    text: '起きる',
    isFinished: false,
  },
]
const failed = false

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { id },
    method,
  } = req
  if (failed) {
    pass
  } else {
    if (method === 'GET') {
      res.status(200).json(tasks)
    } else if (method === 'POST') {
      res.setHeader('Location', '/2').status(201).json({ id: 2 })
    }
  }
}
