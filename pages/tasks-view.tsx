import React, { useState, useEffect } from 'react'
import { Textbox } from '../components/Textbox'
import { Task, TaskType } from '../model/Task'
import { useTasks } from '../hooks/TasksHook'

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

const UnFinishedItem = (props: {
  record: TaskType
  onFinish: (task: TaskType) => void
  onEdit: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
}) => {
  const [editing, setEditing] = useState(false)
  const { record, onFinish, onEdit, onTaskChange } = props
  const onFinishedClick = () => {
    onFinish(record)
  }
  const onEditStartClick = () => {
    setEditing(true)
  }
  const onEditClickLocal = () => {
    onEdit(record)
    setEditing(false)
  }
  const onChange = (name: string, value: string) => {
    onTaskChange(Object.assign(record, { text: value }))
  }
  return (
    <div>
      <button onClick={onFinishedClick}>完了</button>
      {editing || <span> {record.text}</span>}
      {editing && (
        <Textbox name="text" value={record.text} onChange={onChange} />
      )}
      {editing || <button onClick={onEditStartClick}>編集</button>}
      {editing && <button onClick={onEditClickLocal}>決定</button>}
    </div>
  )
}

const FinishedItem = function (props: {
  record: TaskType
  onUnFinish: (task: TaskType) => void
  onRemoveTaskClick: (id: number) => void
}) {
  const { record, onUnFinish, onRemoveTaskClick } = props
  const { id, text } = record
  const onUnFinishedClick = () => {
    onUnFinish(record)
  }
  const onRemoveTaskClickLocal = () => {
    onRemoveTaskClick(id)
  }
  return (
    <div>
      <button onClick={onRemoveTaskClickLocal}>削除</button>
      <span> {text} </span>
      <button onClick={onUnFinishedClick}>未完了に戻す</button>
    </div>
  )
}

export default function Todo(): JSX.Element {
  const {
    tasks,
    updateLocal,
    add,
    remove,
    update,
    toggleFinishState,
  } = useTasks()

  const onToggleFinishStateClick = async (task: TaskType): Promise<void> => {
    const res = await toggleFinishState(task)
    if (res.status === 204) {
      console.log('更新成功')
    } else if (res.status === 404) {
      alert('更新: リソースが存在しない')
    } else {
      alert('更新: 不明なエラー')
    }
  }

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
      <div>
        {tasks
          .filter((record) => record.isFinished === false)
          .map((record) => (
            <UnFinishedItem
              key={record.id}
              record={record}
              onFinish={onToggleFinishStateClick}
              onEdit={onUpdateTaskClick}
              onTaskChange={onTaskChange}
            />
          ))}
      </div>
      <h2>完了</h2>
      <div>
        {tasks
          .filter((task) => task.isFinished === true)
          .map((task) => {
            return (
              <FinishedItem
                key={task.id}
                record={task}
                onUnFinish={onToggleFinishStateClick}
                onRemoveTaskClick={onRemoveTaskClick}
              />
            )
          })}
      </div>
    </>
  )
}
