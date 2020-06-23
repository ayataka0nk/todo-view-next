import { resolveApiPath } from '../libs/ApiPathResolver'

export type TaskType = {
  id: number
  text: string
  isFinished: boolean
}
export type NewTaskType = {
  text: string
}

/**
 * 全件取得
 */
const fetchAll = async (): Promise<TaskType[]> => {
  console.log('fetch called')
  const dataUrl = resolveApiPath('/api/tasks')
  const tasks = await fetch(dataUrl).then((r) => r.json())
  return tasks
}

/**
 * 新規作成
 * @param text
 */
const add = async (task: NewTaskType) => {
  const urlTask = resolveApiPath('/api/tasks')
  const options = {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const res = await fetch(urlTask, options)
  return res
}

/**
 * 更新
 * @param task
 */
const update = async (task: TaskType) => {
  const urlTask = resolveApiPath('/api/tasks/' + task.id)
  const options = {
    method: 'PATCH',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const res = await fetch(urlTask, options)
  return res
}

/**
 * 削除
 * @param id
 */
const remove = async (id: number) => {
  const urlTask = resolveApiPath('/api/tasks/' + id)
  const options = {
    method: 'DELETE',
  }
  const res = await fetch(urlTask, options)
  return res
}

export const Task = {
  fetchAll,
  add,
  update,
  remove,
}
