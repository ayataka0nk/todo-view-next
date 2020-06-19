import React, { useState, useEffect, ReactElement } from 'react'

import { resolveApiPath } from '../libs/ApiPathResolver'

const fetchData = async (): Promise<Task> => {
  const dataUrl = resolveApiPath('/api/connect-test')
  const data = await fetch(dataUrl).then((r) => r.json())
  return data
}
interface Task {
  id: number
  text: string
  isFinished: boolean
}

export default function ConnectTest(): ReactElement {
  const [task, setTask] = useState<Task | null>(null)
  useEffect(() => {
    const asyncWrap = async () => {
      const task = await fetchData()
      setTask(task)
    }
    asyncWrap()
  }, [setTask])

  return (
    <>
      <div>
        <span>ID: </span>
        <span>{task?.id}</span>
      </div>
      <div>
        <span>Text: </span>
        <span>{task?.text} </span>
      </div>
      <div>
        <span>isFinished: </span>
        <span>{task?.isFinished?.toString()}</span>
      </div>
    </>
  )
}
