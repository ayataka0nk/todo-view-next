import { Primary } from '../model/ModelType'
import { useRestApiDataState } from './RestApiDataState'
import { PersistenceOptions } from '../model/ModelType'
import { persistenceOptions } from '../model/Task'

type actionType = 'add' | 'update' | 'remove' | 'change'
export class DataStateError extends Error {
  public name = 'DataStateError'
}

export type DataStateType<T extends Primary, U> = {
  data: T[]
  add: (newModel: U) => Promise<void | DataStateError>
  update: (model: T) => Promise<void | DataStateError>
  remove: (id: number) => Promise<void | DataStateError>
  change: (model: T) => void | DataStateError
}

export const useDataState = <T extends Primary, U>(
  persinstenceOptions: PersistenceOptions
) => {
  if (persinstenceOptions.type === 'rest') {
    return useRestApiDataState<T, U>(persinstenceOptions.options)
  } else {
    throw new Error('Persistence Type Error: ' + persistenceOptions)
  }
}
