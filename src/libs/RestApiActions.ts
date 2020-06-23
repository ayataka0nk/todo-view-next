import { resolveApiPath } from './ApiPathResolver'

export const callGet = async (path: string) => {
  const url = resolveApiPath(path)
  const result = await fetch(url)
  return result
}

export const callPost = async (path: string, body: string) => {
  const url = resolveApiPath(path)
  const options = {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const res = await fetch(url, options)
  return res
}

export const callPatch = async (path: string, body: string) => {
  const url = resolveApiPath(path)
  const options = {
    method: 'PATCH',
    body: body,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const res = await fetch(url, options)
  return res
}

export const callDelete = async (path: string) => {
  //deleteは準予約語のため。
  const url = resolveApiPath(path)
  const options = {
    method: 'DELETE',
  }
  const res = await fetch(url, options)
  return res
}
