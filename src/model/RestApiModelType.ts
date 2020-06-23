export type Primary = {
  id: number
}

export type RestApiActions<T extends Primary, U> = {
  fetchAll: () => Promise<T[]>
  add: (newModelType: U) => Promise<Response>
  update: (modelType: T) => Promise<Response>
  remove: (id: number) => Promise<Response>
}
