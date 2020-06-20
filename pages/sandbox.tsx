import React, { useState } from 'react'
import { Button } from '../components/Button'

const Sandbox: React.FC = () => {
  return (
    <>
      <Button styleType="decision">Decision</Button>
      <Button styleType="cancel">Cancel</Button>
      <Button styleType="decision">決定</Button>
      <Button styleType="cancel">キャンセル</Button>
    </>
  )
}

export default Sandbox
