import React from 'react'

export const Checkbox = (props: {
  name: string
  value: boolean
  onChange: (name: string, value: boolean) => void
}): JSX.Element => {
  const { name, value = false, onChange } = props
  const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(event.target.name, event.target.checked)
    }
  }
  return (
    <>
      <input
        name={name}
        type="checkbox"
        checked={value}
        onChange={onLocalChange}
      />
    </>
  )
}
