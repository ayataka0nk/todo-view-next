import React from 'react'
import { NewTaskType, TaskType, persistenceOptions } from '../model/Task'
import { TasksTemplate } from '../components/templates/TasksTemplate'
import { useRestApiDataState } from '../hooks/RestApiDataState'
import { DataStateError } from '../hooks/DataStateType'

const TasksView: React.FC = () => {
  const { data: tasks, add, update, remove, change } = useRestApiDataState<
    TaskType,
    NewTaskType
  >(persistenceOptions.options)

  const onAddTaskClick = async (task: NewTaskType): Promise<void> => {
    const result = await add(task)
    if (result instanceof DataStateError) {
      alert(result.message)
    }
  }

  const onRemoveTaskClick = async (id: number): Promise<void> => {
    const result = await remove(id)
    if (result instanceof DataStateError) {
      alert(result.message)
    }
  }

  const onUpdateTaskClick = async (task: TaskType) => {
    const result = await update(task)
    if (result instanceof DataStateError) {
      alert(result.message)
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
