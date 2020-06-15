import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { resolveApiPath } from '../lib/ApiPathResolver'

export const getServerSideProps: GetServerSideProps = async () => {
  const dataUrl = resolveApiPath('/api/connect-test')
  const data = await fetch(dataUrl).then((r) => r.json())
  return {
    props: {
      data: data,
    },
  }
}
interface task {
  id: number
  text: string
  isFinished: boolean
}

export default function ConnectTest(props: { data: task }): ReactElement {
  const task = props.data
  return (
    <>
      <div>
        <span>ID: </span>
        <span>{task.id}</span>
      </div>
      <div>
        <span>Text: </span>
        <span>{task.text} </span>
      </div>
      <div>
        <span>isFinished: </span>
        <span>{task.isFinished.toString()}</span>
      </div>
    </>
  )
}
