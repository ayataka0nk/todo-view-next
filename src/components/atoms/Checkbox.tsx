import React from 'react'

type CheckboxProps = {
  name: string
  value: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, value = false, onChange } = props

  return (
    <>
      <input name={name} type="checkbox" checked={value} onChange={onChange} />
    </>
  )
}
