import React, { useState } from 'react'
import { Textbox } from '../atoms/Textbox'
import { NewTaskType } from '../../model/Task'

export const TaskAddForm = (props: { onAdd: (task: NewTaskType) => void }) => {
  const { onAdd } = props
  const [text, setText] = useState('')
  const onTextChange = (name: string, value: string) => {
    setText(value)
  }
  const onButtonClick = (): void => {
    onAdd({ text: text })
    setText('')
  }
  return (
    <>
      <Textbox name="text" value={text} onChange={onTextChange} />
      <button onClick={onButtonClick}>追加</button>
    </>
  )
}
