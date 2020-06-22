import React, { useState, useEffect } from 'react'
import { Textbox } from '../components/Textbox'
import { Task, TaskType } from '../model/Task'

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

const toggleFinishState = async (task: TaskType): Promise<void> => {
  const newTask = { ...task, isFinished: !task.isFinished }
  const res = await Task.update(newTask)
  if (res.status === 204) {
    console.log('更新成功')
  } else if (res.status === 404) {
    alert('リソースが存在しない')
  } else {
    alert('不明なエラー')
  }
}

export default function Todo(): JSX.Element {
  const [data, setData] = useState<TaskType[]>([])
  useEffect(() => {
    const asyncWrap = async () => {
      const tasks = await Task.fetchAll()
      setData(tasks)
    }
    asyncWrap()
  }, [setData])
  const toggleFinishStateClick = async (task: TaskType): Promise<void> => {
    await toggleFinishState(task)
    const data = await Task.fetchAll()
    setData(data)
  }
  const addTaskClick = async (text: string): Promise<void> => {
    await Task.add(text)
    const data = await Task.fetchAll()
    setData(data)
  }

  const removeTaskClick = async (id: number): Promise<void> => {
    const res = await Task.remove(id)
    if (res.status === 204) {
      console.log('削除成功')
    } else if (res.status === 404) {
      alert('リソースが存在しない')
    } else {
      alert('不明なエラー')
    }
    const data = await Task.fetchAll()
    setData(data)
  }

  const updateTaskClick = async (task: TaskType): Promise<void> => {
    await Task.update(task)
    const data = await Task.fetchAll()
    setData(data)
  }
  const onTaskChange = async (task: TaskType): Promise<void> => {
    const newData = data.map((record) => {
      if (record['id'] === task.id) {
        return task
      } else {
        return record
      }
    })
    setData(newData)
  }

  return (
    <>
      <h1>TODOLIST</h1>
      <TaskAddForm onAdd={addTaskClick} />
      <h2>未完了</h2>
      <div>
        {data
          .filter((record) => record.isFinished === false)
          .map((record) => (
            <UnFinishedItem
              key={record.id}
              record={record}
              onFinish={toggleFinishStateClick}
              onEdit={updateTaskClick}
              onTaskChange={onTaskChange}
            />
          ))}
      </div>
      <h2>完了</h2>
      <div>
        {data
          .filter((rec) => rec.isFinished === true)
          .map((record) => {
            return (
              <FinishedItem
                key={record.id}
                record={record}
                onUnFinish={toggleFinishStateClick}
                onRemoveTaskClick={removeTaskClick}
              />
            )
          })}
      </div>
    </>
  )
}
