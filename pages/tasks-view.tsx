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
  record: TaskType
  onEditEnd: (task: TaskType) => void
  onTaskChange: (task: TaskType) => void
  onRemoveClick: (id: number) => void
}) => {
  const { record, onEditEnd, onTaskChange, onRemoveClick } = props

  const onEditEndLocal = () => {
    onEditEnd(record)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = Object.assign(record)
    newTask[event.target.name] = event.target.value
    onTaskChange(newTask)
  }
  const onChangeWithSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    onEditEnd(record)
  }
  const onRemoveClickLocal = () => {
    onRemoveClick(record.id)
  }
  return (
    <div>
      <Checkbox
        name="isFinished"
        value={record.isFinished}
        onChange={onChangeWithSave}
      />
      <EditableText
        name="text"
        value={record.text}
        onChange={onChange}
        onEditEnd={onEditEndLocal}
      />
      <button onClick={onRemoveClickLocal}>削除</button>
    </div>
  )
}

export default function Todo(): JSX.Element {
  const { tasks, updateLocal, add, remove, update } = useTasks()

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
            <TaskItem
              key={record.id}
              record={record}
              onEditEnd={onUpdateTaskClick}
              onTaskChange={onTaskChange}
              onRemoveClick={onRemoveTaskClick}
            />
          ))}
      </div>
      <h2>完了</h2>
      <div>
        {tasks
          .filter((task) => task.isFinished === true)
          .map((task) => {
            return (
              <TaskItem
                key={task.id}
                record={task}
                onEditEnd={onUpdateTaskClick}
                onTaskChange={onTaskChange}
                onRemoveClick={onRemoveTaskClick}
              />
            )
          })}
      </div>
    </>
  )
}
