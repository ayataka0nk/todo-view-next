import { Primary } from '../model/ModelType'

export type DataStateType<T extends Primary, U> = {
  data: T[]
  add: (newModel: U) => Promise<Response>
  update: (model: T) => Promise<Response>
  remove: (id: number) => Promise<Response>
  change: (model: T) => void
}
