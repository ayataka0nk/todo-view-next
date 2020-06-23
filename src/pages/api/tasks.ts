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
  {
    id: 3,
    text: 'うおおおおあああああああああああああああああああああ',
    isFinished: false,
  },
]
const failed = false

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { id, text },
    body,
    method,
  } = req
  if (!failed) {
    if (method === 'GET') {
      res.status(200).json(tasks)
    } else if (method === 'POST') {
      console.log(body.text)
      res.setHeader('Location', '/2')
      res.status(201)
      res.json({ errors: ['エラー1', 'エラー2'] })
    }
  }
}
