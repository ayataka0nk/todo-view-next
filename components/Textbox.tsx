import React from 'react'

type TextboxProps = {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  readOnly: boolean
}

export const Textbox = (props: TextboxProps): JSX.Element => {
  const { name, value, onChange, readOnly = false } = props
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
        readOnly={readOnly}
      />
    </>
  )
}
