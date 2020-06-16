import React, { useState } from 'react'
import { resolveApiPath } from '../lib/ApiPathResolver'

type Task = {
  id: number
  text: string
  isFinished: boolean
}

export const getServerSideProps = async (): { props: { tasks: Task[] } } => {
  const dataUrl = resolveApiPath('/api/tasks')
  const tasks = await fetch(dataUrl).then((r) => r.json())
  return {
    props: {
      tasks: tasks,
    },
  }
}

const UnFinishedItem = (props: {
  record: Task
  onFinish: (id: string) => void
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
  onUnFinish: (id: string) => void
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

  const toggleFinishState = (id): void => {
    const newData = data.map((record) => {
      if (record['id'] === id) {
        return { ...record, isFinished: !record.isFinished }
      } else {
        return record
      }
    })
    setData(newData)
  }
  return (
    <>
      <h1>TODOLIST</h1>
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
