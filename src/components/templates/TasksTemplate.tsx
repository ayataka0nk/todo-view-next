import React from 'react'
import { TaskType } from '../../model/Task'
import { TaskAddForm } from '../molecules/TaskAddForm'
import { Tasks } from '../organisms/Tasks'

export type TasksTemplateProps = {
  tasks: TaskType[]
  editting: number | null
  setEditting: (id: number | null) => void
  onAddTaskClick: (text: string) => void
  onRemoveTaskClick: (id: number) => void
  onUpdateTaskClick: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
}

export const TasksTemplate: React.FC<TasksTemplateProps> = (props) => {
  return (
    <>
      <h1>TODOLIST</h1>
      <TaskAddForm onAdd={props.onAddTaskClick} />
      <h2>未完了</h2>
      <Tasks
        tasks={props.tasks}
        isFinished={false}
        editting={props.editting}
        setEditting={props.setEditting}
        onUpdateTaskClick={props.onUpdateTaskClick}
        onTaskChange={props.onTaskChange}
        onRemoveClick={props.onRemoveTaskClick}
      />
      <h2>完了</h2>
      <Tasks
        tasks={props.tasks}
        isFinished={true}
        editting={props.editting}
        setEditting={props.setEditting}
        onUpdateTaskClick={props.onUpdateTaskClick}
        onTaskChange={props.onTaskChange}
        onRemoveClick={props.onRemoveTaskClick}
      />
    </>
  )
}
