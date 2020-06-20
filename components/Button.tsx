import React from 'react'
import css from 'styled-jsx/css'

type ButtonProps = {
  styleType: 'plane' | 'decision' | 'cancel'
}
const commonStyle = css`
  button {
    border-radius: 3px;
    border-style: solid;
    box-sizing: border-box;
    cursor: pointer;
    min-width: 75px;
    min-height: 18px;
  }
  .plane {
    color: rgb(0, 0, 0);
    background-color: rgb(245, 245, 245);
    border-color: rgb(216, 216, 216);
  }
  .decision {
    color: rgb(255, 255, 255);
    background-color: rgb(107, 175, 119);
    border-color: rgb(85, 165, 98);
  }
  .cancel {
  }
`

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { styleType } = props
  return (
    <>
      <button className={styleType}>{props?.children}</button>
      <style jsx>{commonStyle}</style>
    </>
  )
}
