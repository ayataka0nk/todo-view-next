import { useState, useEffect } from 'react'
import { Primary, RestOptions } from '../model/ModelType'
import { DataStateType } from './DataStateType'
import {
  callGet,
  callPost,
  callPatch,
  callDelete,
} from '../libs/RestApiActions'

export const useRestApiDataState = <T extends Primary, U>(
  options: RestOptions
): DataStateType<T, U> => {
  const [data, setData] = useState<T[]>([])

  const fetchAll = async (path: string) => {
    const res = await callGet(path)
    const resData = await res.json()
    return resData
  }

  useEffect(() => {
    const asyncWrap = async () => {
      const newData = await fetchAll(options.path)
      setData(newData)
    }
    asyncWrap()
  }, [setData])

  const add = async (newModel: U) => {
    const res = await callPost(options.path, JSON.stringify(newModel))
    const newData = await fetchAll(options.path)
    setData(newData)
    return res
  }

  const update = async (model: T) => {
    const res = await callPatch(
      options.path + '/' + model.id,
      JSON.stringify(model)
    )
    const newData = await fetchAll(options.path)
    setData(newData)
    return res
  }

  const remove = async (id: number) => {
    const res = await callDelete(options.path + '/' + id)
    const newData = await fetchAll(options.path)
    setData(newData)
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
