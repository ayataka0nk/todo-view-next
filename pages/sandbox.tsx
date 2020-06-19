import React, { useState } from 'react'
import { Checkbox } from '../components/Checkbox'
import { Textbox } from '../components/Textbox'

const Sandbox = (): JSX.Element => {
  const [checkboxValue, setCheckboxValue] = useState(false)
  const onCheckboxChange = (name: string, value: boolean) => {
    setCheckboxValue(value)
  }
  const [textboxValue, setTextboxValue] = useState('')
  const onTextboxChange = (name: string, value: string) => {
    setTextboxValue(value)
  }
  return (
    <>
      <Checkbox
        name="testbox"
        value={checkboxValue}
        onChange={onCheckboxChange}
      />
      <Textbox name="textbox" value={textboxValue} onChange={onTextboxChange} />
    </>
  )
}

export default Sandbox
