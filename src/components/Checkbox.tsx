import React from 'react'

type CheckboxProps = {
  name: string
  value: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange?: (name: string, value: boolean) => void
}
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, value = false, onChange, handleChange } = props
  const onChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    handleChange && handleChange(event.target.name, event.target.checked)
  }

  return (
    <>
      <input
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChangeLocal}
      />
    </>
  )
}
