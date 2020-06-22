import React from 'react'
import { TaskType } from '../../model/Task'
import { Task } from '../molecules/Task'

export type FilteredTasksProps = {
  tasks: TaskType[]
  isFinished: boolean
  editting: number | null
  setEditting: (id: number | null) => void
  onUpdateTaskClick: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
  onRemoveClick: (id: number) => void
}

export const Tasks: React.FC<FilteredTasksProps> = (props) => {
  return (
    <div>
      {props.tasks
        .filter((task) => task.isFinished === props.isFinished)
        .map((task, index) => (
          <Task
            key={task.id}
            task={task}
            editting={props.editting === task.id}
            setEditting={props.setEditting}
            onEditEnd={props.onUpdateTaskClick}
            onTaskChange={props.onTaskChange}
            onRemoveClick={props.onRemoveClick}
          />
        ))}
    </div>
  )
}
