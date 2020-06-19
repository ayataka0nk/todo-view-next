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
  onFinish: (task: Task) => void
  onEdit: (task: Task) => void
  onTaskChange: (task: Task) => void
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
  record: Task
  onUnFinish: (task: Task) => void
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
  const res = await fetch(urlTask, options)
  return res
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
const toggleFinishState = async (task: Task): Promise<void> => {
  const newTask = { ...task, isFinished: !task.isFinished }
  await updateTask(newTask)
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
  const toggleFinishStateClick = async (task: Task): Promise<void> => {
    await toggleFinishState(task)
    const data = await fetchAllTasks()
    setData(data)
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

  const updateTaskClick = async (task: Task): Promise<void> => {
    await updateTask(task)
    const data = await fetchAllTasks()
    setData(data)
  }
  const onTaskChange = async (task: Task): Promise<void> => {
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
