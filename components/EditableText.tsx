import React, { useState, useRef, useEffect } from 'react'

export type EditableTextType = {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEditStart?: () => void
  onEditEnd?: () => void
}
export const EditableText: React.FC<EditableTextType> = (props) => {
  const { name, value, onChange, onEditStart, onEditEnd } = props
  const [editting, setEditting] = useState(false)
  const inputTextRef = useRef<HTMLInputElement>(null)
  const onDisplayTextClick = () => {
    setEditting(true)
    onEditStart && onEditStart()
  }
  const onBlurEdittingText = () => {
    onEditEnd && onEditEnd()
    setEditting(false)
  }

  useEffect(() => {
    if (editting === true) {
      inputTextRef.current?.focus()
      console.log(inputTextRef.current)
    }
  }, [editting])

  const EdittingText = (
    <input
      ref={inputTextRef}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlurEdittingText}
    />
  )
  const DisplayText = <span onClick={onDisplayTextClick}>{value}</span>
  return editting ? EdittingText : DisplayText
}
