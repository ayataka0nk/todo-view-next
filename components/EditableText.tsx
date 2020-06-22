import React, { useState, useRef, useEffect } from 'react'

export type EditableTextType = {
  name: string
  value: string
  editting?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange?: (name: string, value: string) => void
  onEditStart?: () => void
  onEditEnd?: () => void
}
export const EditableText: React.FC<EditableTextType> = (props) => {
  const {
    name,
    value,
    editting,
    onChange,
    onEditStart,
    onEditEnd,
    handleChange,
  } = props
  const inputTextRef = useRef<HTMLInputElement>(null)
  const onDisplayTextClick = () => {
    onEditStart && onEditStart()
  }
  const onBlurEdittingText = () => {
    onEditEnd && onEditEnd()
  }
  const onChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    handleChange && handleChange(event.target.name, event.target.value)
  }

  useEffect(() => {
    if (editting === true) {
      inputTextRef.current?.focus()
    }
  }, [editting])

  const EdittingText = (
    <>
      <input
        ref={inputTextRef}
        name={name}
        value={value}
        onChange={onChangeLocal}
        onBlur={onBlurEdittingText}
      />
      <style jsx>
        {`
          input {
            width: 100%;
          }
        `}
      </style>
    </>
  )
  const DisplayText = (
    <>
      <span onClick={onDisplayTextClick}>{value}</span>
    </>
  )
  return editting ? EdittingText : DisplayText
}
