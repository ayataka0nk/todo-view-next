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
}) => {
  const { record, onFinish } = props
  const onFinishedClick = () => {
    onFinish(record.id)
  }
  return (
    <div>
      <button onClick={onFinishedClick}>完了</button>
      <span> {record.text}</span>
    </div>
  )
}

const FinishedItem = function (props: {
  record: Task
  onUnFinish: (id: number) => void
}) {
  const { record, onUnFinish } = props
  const { id, text } = record
  const onUnFinishedClick = () => {
    onUnFinish(id)
  }
  return (
    <div>
      <button onClick={onUnFinishedClick}>未完了に戻す</button>
      <span> {text} </span>
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
              />
            )
          })}
      </div>
    </>
  )
}
