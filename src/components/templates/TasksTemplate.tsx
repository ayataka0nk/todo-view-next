import React from 'react'
import { NewTaskType, TaskType } from '../../model/Task'
import { TaskAddForm } from '../molecules/TaskAddForm'
import { Tasks } from '../organisms/Tasks'

export type TasksTemplateProps = {
  tasks: TaskType[]
  add: (task: NewTaskType) => void
  update: (task: TaskType) => void
  remove: (id: number) => void
  onTaskChange: (task: TaskType) => void
}

export const TasksTemplate: React.FC<TasksTemplateProps> = (props) => {
  return (
    <>
      <h1>TODOLIST</h1>
      <TaskAddForm onAdd={props.add} />
      <h2>未完了</h2>
      <Tasks
        tasks={props.tasks}
        isFinished={false}
        update={props.update}
        remove={props.remove}
        onTaskChange={props.onTaskChange}
      />
      <h2>完了</h2>
      <Tasks
        tasks={props.tasks}
        isFinished={true}
        update={props.update}
        remove={props.remove}
        onTaskChange={props.onTaskChange}
      />
    </>
  )
}
