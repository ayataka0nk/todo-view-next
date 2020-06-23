import React, { useRef, useEffect } from 'react'

export type EditableTextType = {
  name: string
  value: string
  editting?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const EditableText: React.FC<EditableTextType> = (props) => {
  const { name, value, editting, onChange, onBlur } = props
  const inputTextRef = useRef<HTMLInputElement>(null)

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
        onChange={onChange}
        onBlur={onBlur}
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
      <span>{value}</span>
    </>
  )
  return editting ? EdittingText : DisplayText
}
