import React from 'react'

export const Checkbox = (props: {
  name: string
  value: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
  const { name, value = false, onChange } = props
  return (
    <>
      <input name={name} type="checkbox" checked={value} onChange={onChange} />
    </>
  )
}
