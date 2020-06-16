import { NextApiRequest, NextApiResponse } from 'next'
import { tasks } from '../tasks'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { id },
    method,
  } = req

  if (method === 'GET') {
    const searchedTask = tasks.filter((task) => task.id === Number(id))
    res.status(200).json(searchedTask)
  } else if (method === 'PUT') {
    res.status(204).send('')
  } else if (method === 'DELETE') {
    res.status(204).send('')
  }
}
