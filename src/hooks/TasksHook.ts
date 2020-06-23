import { useState, useEffect } from 'react'
import { Task, TaskType, NewTaskType } from '../model/Task'

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])

  useEffect(() => {
    const asyncWrap = async () => {
      const tasks = await Task.fetchAll()
      setTasks(tasks)
    }
    asyncWrap()
  }, [setTasks])

  const add = async (task: NewTaskType) => {
    const res = await Task.add(task)
    const tasks = await Task.fetchAll()
    setTasks(tasks)
    return res
  }

  const remove = async (id: number) => {
    const res = await Task.remove(id)
    const tasks = await Task.fetchAll()
    setTasks(tasks)
    return res
  }

  const update = async (task: TaskType) => {
    const res = await Task.update(task)
    const tasks = await Task.fetchAll()
    setTasks(tasks)
    return res
  }

  const updateLocal = async (newTask: TaskType): Promise<void> => {
    const newTasks = tasks.map((task) => {
      if (task['id'] === newTask.id) {
        return task
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }

  return { tasks, updateLocal, add, remove, update }
}
