import { JSX } from 'react'
import { Button, createTheme, ThemeProvider } from '@mui/material' 

const theme = createTheme({
    palette: {
        primary: {
            main: "#206BC4"
        },
    }
})

type Props = {
    onClick: () => void
    text?: string
    children?: string | JSX.Element | JSX.Element[] 
    isDisabled: boolean
}

const MUIButton = ({onClick, text, children, isDisabled}: Props) => {
  return (
    <ThemeProvider theme={theme}>
        <Button onClick={onClick} variant='outlined' disabled={isDisabled}>{text} {children}</Button>
    </ThemeProvider>
  )
}

export default MUIButton








