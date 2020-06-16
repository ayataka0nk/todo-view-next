import React, { useState } from 'react'
import { resolveApiPath } from '../apilib/ApiPathResolver'
import { Textbox } from '../components/Textbox'
import getConfig from 'next/config'

type Task = {
  id: number
  text: string
  isFinished: boolean
}
//後で分ける
const resolveApiPathClient = (apiPathname: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const origin = publicRuntimeConfig.publicApiOrigin
  return new URL(apiPathname, origin).toString()
}

export const getServerSideProps = async (): Promise<{
  props: { tasks: Task[] }
}> => {
  const dataUrl = resolveApiPath('/api/tasks')
  const tasks = await fetch(dataUrl).then((r) => r.json())
  return {
    props: {
      tasks: tasks,
    },
  }
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

export default function Todo(props: { tasks: Task[] }): JSX.Element {
  const [data, setData] = useState(props.tasks)

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
  /**分離予定 */
  const addTask = async (text: string) => {
    const data = {
      text: text,
    }
    const urlTask = resolveApiPathClient('/api/tasks')
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
  return (
    <>
      <h1>TODOLIST</h1>
      <TaskAddForm onAdd={addTask} />
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
