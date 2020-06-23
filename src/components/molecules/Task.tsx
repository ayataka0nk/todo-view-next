import React from 'react'
import { TaskType } from '../../model/Task'
import { Checkbox } from '../atoms/Checkbox'
import { EditableText } from '../atoms/EditableText'

export type TaskProps = {
  task: TaskType
  editting: boolean
  startEdit: (id: number) => void
  endEdit: (id: number) => void
  update: (task: TaskType) => void
  remove: (id: number) => void
  onTaskChange: (task: TaskType) => void
}

export const Task: React.FC<TaskProps> = (props) => {
  const {
    task,
    editting,
    startEdit,
    endEdit,
    update,
    remove,
    onTaskChange,
  } = props

  const getChangedTask = (
    task: TaskType,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.type === 'checkbox') {
      return { ...task, [event.target.name]: event.target.checked }
    } else {
      return { ...task, [event.target.name]: event.target.value }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange(getChangedTask(task, event))
  }

  const handleChangeWithSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange(getChangedTask(task, event))
    update(task)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    endEdit(task.id)
  }

  const onRemoveClick = () => {
    remove(task.id)
  }

  return (
    <div
      className="columns"
      onDoubleClick={() => startEdit(task.id)}
      onBlur={() => endEdit(task.id)}
    >
      <div className="is-finished">
        <Checkbox
          name="isFinished"
          value={task.isFinished}
          onChange={handleChangeWithSave}
        />
      </div>
      <div className="text">
        <EditableText
          name="text"
          editting={editting}
          value={task.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="delete-button">
        <button onClick={onRemoveClick}>削除</button>
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
