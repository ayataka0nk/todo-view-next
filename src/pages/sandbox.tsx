import React, { useState } from 'react'
import { Button } from '../components/atoms/Button'
import {
  EditableTextType,
  EditableText,
} from '../components/atoms/EditableText'

const Sandbox: React.FC = () => {
  const [text, setText] = useState('default')
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  return (
    <>
      <Button styleType="decision">Decision</Button>
      <Button styleType="cancel">Cancel</Button>
      <Button styleType="decision">決定</Button>
      <Button styleType="cancel">キャンセル</Button>
      <EditableText name="editableText" value={text} onChange={onTextChange} />
      <EditableText name="editableText2" value={text} onChange={onTextChange} />
    </>
  )
}

export default Sandbox
