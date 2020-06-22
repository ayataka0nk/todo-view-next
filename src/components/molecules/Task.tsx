import React from 'react'
import { TaskType } from '../../model/Task'
import { Checkbox } from '../atoms/Checkbox'
import { EditableText } from '../atoms/EditableText'

export type TaskProps = {
  task: TaskType
  editting: boolean
  setEditting: (id: number | null) => void
  onEditEnd: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
  onRemoveClick: (id: number) => void
}

export const Task: React.FC<TaskProps> = (props) => {
  const {
    task,
    editting,
    setEditting,
    onEditEnd,
    onTaskChange,
    onRemoveClick,
  } = props

  const onEditEndLocal = () => {
    onEditEnd(task)
  }

  const handleChange = (name: string, value: string | boolean) => {
    const newTask = Object.assign(task)
    newTask[name] = value
    onTaskChange(newTask)
  }

  const handleChangeWithSave = (name: string, value: boolean) => {
    handleChange(name, value)
    onEditEnd(task)
  }
  const onRemoveClickLocal = () => {
    onRemoveClick(task.id)
  }
  return (
    <div
      className="columns"
      onDoubleClick={() => setEditting(task.id)}
      onBlur={() => setEditting(null)}
    >
      <div className="is-finished">
        <Checkbox
          name="isFinished"
          value={task.isFinished}
          handleChange={handleChangeWithSave}
        />
      </div>
      <div className="text">
        <EditableText
          name="text"
          editting={editting}
          value={task.text}
          handleChange={handleChange}
          onEditEnd={onEditEndLocal}
        />
      </div>
      <div className="delete-button">
        <button onClick={onRemoveClickLocal}>削除</button>
      </div>

      <style jsx>{`
        div {
        }
        .columns {
          display: flex;
          width: 400px;
        }
        .columns > .is-finished {
          width: 20px;
        }
        .columns > .text {
          flex: 1;
          padding: 0px 10px;
        }
        .columns > .delete-button {
          width: 50px;
        }
      `}</style>
    </div>
  )
}
