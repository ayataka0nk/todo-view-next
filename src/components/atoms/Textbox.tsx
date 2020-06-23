import React from 'react'

export type TextboxProps = {
  name: string
  value: string
  onChange?: (name: string, value: string) => void
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void
  readOnly?: boolean
}

export const Textbox = (props: TextboxProps): JSX.Element => {
  const { name, value, onChange, readOnly = false, onBlur = undefined } = props
  const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof onChange === 'function') {
      onChange(event.target.name, event.target.value)
    }
  }
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onLocalChange}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    </>
  )
}
