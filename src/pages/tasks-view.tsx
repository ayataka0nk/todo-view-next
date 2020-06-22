import React, { useState, useEffect } from 'react'
import { TaskType } from '../model/Task'
import { useTasks } from '../hooks/TasksHook'
import { TasksTemplate } from '../components/templates/TasksTemplate'

const TasksView: React.FC = () => {
  const { tasks, updateLocal, add, remove, update } = useTasks()
  const [editting, setEditting] = useState<number | null>(null)
  const onAddTaskClick = async (text: string): Promise<void> => {
    const res = await add(text)
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
    updateLocal(task)
  }
  return (
    <TasksTemplate
      tasks={tasks}
      editting={editting}
      setEditting={setEditting}
      onAddTaskClick={onAddTaskClick}
      onRemoveTaskClick={onRemoveTaskClick}
      onUpdateTaskClick={onUpdateTaskClick}
      onTaskChange={onTaskChange}
    />
  )
}

export default TasksView
