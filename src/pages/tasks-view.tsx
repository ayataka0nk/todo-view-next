import React, { useState, useEffect } from 'react'
import { Textbox } from '../components/Textbox'
import { Task, TaskType } from '../model/Task'
import { useTasks } from '../hooks/TasksHook'
import { Checkbox } from '../components/Checkbox'
import { EditableText } from '../components/EditableText'

const TaskAddForm = (props: { onAdd: (text: string) => void }) => {
  const { onAdd } = props
  const [text, setText] = useState('')
  const onTextChange = (name: string, value: string) => {
    setText(value)
  }
  const onButtonClick = (): void => {
    onAdd(text)
    setText('')
  }
  return (
    <>
      <Textbox name="text" value={text} onChange={onTextChange} />
      <button onClick={onButtonClick}>追加</button>
    </>
  )
}

const TaskItem = (props: {
  task: TaskType
  editting: boolean
  setEditting: (id: number | null) => void
  onEditEnd: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
  onRemoveClick: (id: number) => void
}) => {
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

type FilteredTasksProps = {
  tasks: TaskType[]
  isFinished: boolean
  editting: number | null
  setEditting: (id: number | null) => void
  onUpdateTaskClick: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
  onRemoveClick: (id: number) => void
}

const FilteredTasks: React.FC<FilteredTasksProps> = (props) => {
  return (
    <div>
      {props.tasks
        .filter((task) => task.isFinished === props.isFinished)
        .map((task, index) => (
          <TaskItem
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

export default function Todo(): JSX.Element {
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
    <>
      <h1>TODOLIST</h1>
      <TaskAddForm onAdd={onAddTaskClick} />
      <h2>未完了</h2>
      <FilteredTasks
        tasks={tasks}
        isFinished={false}
        editting={editting}
        setEditting={setEditting}
        onUpdateTaskClick={onUpdateTaskClick}
        onTaskChange={onTaskChange}
        onRemoveClick={onRemoveTaskClick}
      />
      <h2>完了</h2>
      <FilteredTasks
        tasks={tasks}
        isFinished={true}
        editting={editting}
        setEditting={setEditting}
        onUpdateTaskClick={onUpdateTaskClick}
        onTaskChange={onTaskChange}
        onRemoveClick={onRemoveTaskClick}
      />
    </>
  )
}
