import { useState, useEffect } from 'react'
import { Primary, RestOptions } from '../model/ModelType'
import { DataStateType, DataStateError } from './DataStateType'
import {
  callGet,
  callPost,
  callPatch,
  callDelete,
} from '../libs/RestApiActions'

class RestApiDataStateError extends DataStateError {
  public name = 'RestApiDataStateError'
}

type UnprocessableEntityResponse = {
  errors: string[]
}

const generateCommonErrorMessage = async (res: Response, name: string) => {
  if (res.status === 422) {
    const resJson: UnprocessableEntityResponse = await res.json()
    return resJson.errors.join('\n')
  } else if (res.status === 500) {
    return `サーバエラーにより処理: ${name} に失敗しました。`
  } else {
    return `不明なエラーにより処理: ${name} に失敗しました。`
  }
}

export const useRestApiDataState = <T extends Primary, U>(
  options: RestOptions
): DataStateType<T, U> => {
  const [data, setData] = useState<T[]>([])

  const fetchAll = async (path: string) => {
    const res = await callGet(path)
    if (res.status !== 200) {
      return new RestApiDataStateError(
        '不明なエラーによりデータの取得に失敗しました。'
      )
    }
    const resData: T[] = await res.json()
    return resData
  }

  useEffect(() => {
    const asyncWrap = async () => {
      const newData = await fetchAll(options.path)
      //初回データ取得で失敗したらさすがにアプリ故障
      if (newData instanceof RestApiDataStateError) {
        throw Error(newData.message)
      }
      setData(newData)
    }
    asyncWrap()
  }, [setData])

  const add = async (newModel: U) => {
    const res = await callPost(options.path, JSON.stringify(newModel))
    if (res.status === 201) {
      const newData = await fetchAll(options.path)
      if (newData instanceof RestApiDataStateError) return newData
      setData(newData)
    } else {
      const message = await generateCommonErrorMessage(res, '追加')
      return new RestApiDataStateError(message)
    }
  }

  const update = async (model: T) => {
    const res = await callPatch(
      options.path + '/' + model.id,
      JSON.stringify(model)
    )
    if (res.status === 204) {
      const newData = await fetchAll(options.path)
      if (newData instanceof RestApiDataStateError) return newData
      setData(newData)
    } else {
      const message = await generateCommonErrorMessage(res, '更新')
      return new RestApiDataStateError(message)
    }
  }

  const remove = async (id: number) => {
    const res = await callDelete(options.path + '/' + id)
    if (res.status === 204) {
      const newData = await fetchAll(options.path)
      if (newData instanceof RestApiDataStateError) return newData
      setData(newData)
    } else {
      const message = await generateCommonErrorMessage(res, '削除')
      return new RestApiDataStateError(message)
    }
  }

  const change = (model: T) => {
    const index = data.findIndex((element) => element.id === model.id)
    const newData = [...data]
    newData[index] = { ...data[index], ...model }
    setData(newData)
  }

  return { data, add, update, remove, change }
}
