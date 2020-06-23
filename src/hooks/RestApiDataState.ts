import { useState, useEffect } from 'react'
import { Primary, RestApiActions } from '../model/RestApiModelType'
import { DataStateType } from './DataStateType'

export const useRestApiDataState = <T extends Primary, U>(
  restApiModel: RestApiActions<T, U>
): DataStateType<T, U> => {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const asyncWrap = async () => {
      const data = await restApiModel.fetchAll()
      setData(data)
    }
    asyncWrap()
  }, [setData])

  const add = async (newModel: U) => {
    const res = await restApiModel.add(newModel)
    const data = await restApiModel.fetchAll()
    setData(data)
    return res
  }

  const update = async (model: T) => {
    const res = await restApiModel.update(model)
    const data = await restApiModel.fetchAll()
    setData(data)
    return res
  }

  const remove = async (id: number) => {
    const res = await restApiModel.remove(id)
    const data = await restApiModel.fetchAll()
    setData(data)
    return res
  }

  const change = async (model: T) => {
    const index = data.findIndex((element) => element.id === model.id)
    const newData = [...data]
    newData[index] = { ...data[index], ...model }
    setData(newData)
  }

  return { data, add, update, remove, change }
}
