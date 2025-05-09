import { JSX } from 'react'
import { Button } from '@mui/material'

type Props = {
    onClick: () => void
    text?: string
    children?: string | JSX.Element | JSX.Element[] 
}

const MUIButton = ({onClick, text, children}: Props) => {
  return (
    <Button onClick={onClick}>{text} {children}</Button>
  )
}

export default MUIButton








