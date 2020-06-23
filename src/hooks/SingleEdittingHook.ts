import { useState } from 'react'

export const useSingleEditting = (id: number | null) => {
  const [edittingId, setEdittingId] = useState(id)

  const startEdit = (id: number) => {
    setEdittingId(id)
  }
  const endEdit = () => {
    setEdittingId(null)
  }
  return { edittingId, startEdit, endEdit }
}
