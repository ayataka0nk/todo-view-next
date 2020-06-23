import React from 'react'
import { Task, NewTaskType, TaskType } from '../model/Task'
import { useTasks } from '../hooks/TasksHook'
import { TasksTemplate } from '../components/templates/TasksTemplate'
import { useRestApiDataState } from '../hooks/RestApiDataState'

const TasksView: React.FC = () => {
  const { data: tasks, add, update, remove, change } = useRestApiDataState<
    TaskType,
    NewTaskType
  >(Task)

  const onAddTaskClick = async (task: NewTaskType): Promise<void> => {
    const res = await add(task)
    if (res.status === 201) {
      console.log('登録成功')
    } else {
      alert('登録: 不明なエラー')
    }
  }

  const onRemoveTaskClick = async (id: number): Promise<void> => {
    const res = await remove(id)
    if (res.status === 204) {
      console.log('削除成功')
    } else if (res.status === 404) {
      alert('削除: リソースが存在しない')
    } else {
      alert('削除: 不明なエラー')
    }
  }

  const onUpdateTaskClick = async (task: TaskType) => {
    const res = await update(task)
    if (res.status === 204) {
      console.log('更新成功')
    } else if (res.status === 404) {
      alert('更新: リソースが存在しない')
    } else {
      alert('更新: 不明なエラー')
    }
  }

  const onTaskChange = async (task: TaskType): Promise<void> => {
    change(task)
  }

  return (
    <TasksTemplate
      tasks={tasks}
      add={onAddTaskClick}
      update={onUpdateTaskClick}
      remove={onRemoveTaskClick}
      onTaskChange={onTaskChange}
    />
  )
}

export default TasksView
