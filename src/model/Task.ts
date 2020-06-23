import { PersistenceOptions } from './ModelType'

export type TaskType = {
  id: number
  text: string
  isFinished: boolean
}

export type NewTaskType = {
  text: string
}

export const persistenceOptions: PersistenceOptions = {
  type: 'rest',
  options: {
    path: '/api/tasks',
  },
}
