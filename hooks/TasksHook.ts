import { useState, useEffect } from 'react'
import { Task, TaskType } from '../model/Task'

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])

  useEffect(() => {
    const asyncWrap = async () => {
      const tasks = await Task.fetchAll()
      setTasks(tasks)
    }
    asyncWrap()
  }, [setTasks])

  const add = async (text: string) => {
    const res = await Task.add(text)
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

  const toggleFinishState = async (task: TaskType) => {
    const newTask = { ...task, isFinished: !task.isFinished }
    const res = await Task.update(newTask)
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

  return { tasks, updateLocal, add, remove, update, toggleFinishState }
}
