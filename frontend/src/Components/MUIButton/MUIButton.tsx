import { JSX } from 'react'
import { Button, createTheme, ThemeProvider } from '@mui/material' 

const theme = createTheme({
    palette: {
        primary: {
            main: "#206BC4"
        },
        mode: 'dark'
    }
})

type Props = {
    onClick: () => void
    text?: string
    children?: string | JSX.Element | JSX.Element[] 
    isDisabled: boolean
    startIcon?: JSX.Element
}

const MUIButton = ({onClick, text, children, isDisabled, startIcon}: Props) => {
  return (
    <ThemeProvider theme={theme}>
        <Button onClick={onClick} startIcon={startIcon} variant='outlined' disabled={isDisabled}>{text} {children}</Button>
    </ThemeProvider>
  )
}

export default MUIButton








