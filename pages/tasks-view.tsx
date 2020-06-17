import React, { useState, useEffect } from 'react'
import { Textbox } from '../components/Textbox'
import { resolveApiPath } from '../libs/ApiPathResolver'

type Task = {
  id: number
  text: string
  isFinished: boolean
}

const fetchAllTasks = async (): Promise<Task[]> => {
  console.log('fetch called')
  const dataUrl = resolveApiPath('/api/tasks')
  const tasks = await fetch(dataUrl).then((r) => r.json())
  return tasks
}

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
  record: Task
  onFinish: (id: number) => void
  onEdit: (task: Task) => void
  onChange: (task: Task) => void
}) => {
  const [editing, setEditing] = useState(false)
  const { record, onFinish, onEdit, onChange } = props
  const onFinishedClick = () => {
    onFinish(record.id)
  }
  const onEditStartClick = () => {
    setEditing(true)
  }
  const onEditClickLocal = () => {
    onEdit(record)
    setEditing(false)
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
  record: Task
  onUnFinish: (id: number) => void
  onRemoveTaskClick: (id: number) => void
}) {
  const { record, onUnFinish, onRemoveTaskClick } = props
  const { id, text } = record
  const onUnFinishedClick = () => {
    onUnFinish(id)
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

/**分離予定 */
const addTask = async (text: string) => {
  const data = {
    text: text,
  }
  const urlTask = resolveApiPath('/api/tasks')
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const resJson = await fetch(urlTask, options).then((r) => r.json())
  return resJson
}

const updateTask = async (task: Task) => {
  const urlTask = resolveApiPath('/api/tasks/' + task.id)
  const options = {
    method: 'PATCH',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
  const res = await fetch(urlTask, options)
  if (res.status === 204) {
    alert('更新成功')
  } else if (res.status === 404) {
    alert('リソースが存在しない')
  } else {
    alert('不明なエラー')
  }
}

const removeTask = async (id: number) => {
  const urlTask = resolveApiPath('/api/tasks/' + id)
  const options = {
    method: 'DELETE',
  }
  const res = await fetch(urlTask, options)
  if (res.status === 204) {
    alert('削除成功')
  } else if (res.status === 404) {
    alert('リソースが存在しない')
  } else {
    alert('不明なエラー')
  }
}

export default function Todo(): JSX.Element {
  const [data, setData] = useState<Task[]>([])
  useEffect(() => {
    const asyncWrap = async () => {
      const tasks = await fetchAllTasks()
      setData(tasks)
    }
    asyncWrap()
  }, [setData])
  const toggleFinishState = (id: number): void => {
    const newData = data.map((record) => {
      if (record['id'] === id) {
        return { ...record, isFinished: !record.isFinished }
      } else {
        return record
      }
    })
    setData(newData)
  }
  const addTaskClick = async (text: string): Promise<void> => {
    await addTask(text)
    const data = await fetchAllTasks()
    setData(data)
  }

  const removeTaskClick = async (id: number): Promise<void> => {
    await removeTask(id)
    const data = await fetchAllTasks()
    setData(data)
  }

  const updateTaskClick = async (task: number): Promise<viod> => {
    await updateTask(task)
    const data = await fetchAllTasks()
    setData(data)
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
              onFinish={toggleFinishState}
              onEdit={updateTaskClick}
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
                onUnFinish={toggleFinishState}
                onRemoveTaskClick={removeTaskClick}
              />
            )
          })}
      </div>
    </>
  )
}
