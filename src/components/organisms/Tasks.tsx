import React from 'react'
import { TaskType } from '../../model/Task'
import { Task } from '../molecules/Task'
import { useSingleEditting } from '../../hooks/SingleEdittingHook'

export type FilteredTasksProps = {
  tasks: TaskType[]
  isFinished: boolean
  update: (task: TaskType) => void
  remove: (id: number) => void
  onTaskChange: (task: TaskType) => void
}

export const Tasks: React.FC<FilteredTasksProps> = (props) => {
  const { edittingId, startEdit, endEdit } = useSingleEditting(null)

  return (
    <div>
      {props.tasks
        .filter((task) => task.isFinished === props.isFinished)
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            editting={edittingId === task.id}
            startEdit={startEdit}
            endEdit={endEdit}
            update={props.update}
            remove={props.remove}
            onTaskChange={props.onTaskChange}
          />
        ))}
    </div>
  )
}
