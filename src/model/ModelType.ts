export type Primary = {
  id: number
}

export type RestOptions = {
  path: string
}

export type PersistenceOptions = {
  type: 'rest'
  options: RestOptions
}
