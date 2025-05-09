import { JSX } from 'react'
import { Button, createTheme, ThemeProvider } from '@mui/material' 

const theme = createTheme({
    palette: {
        primary: {
            main: "#29A3A3"
        },
    }
})

type Props = {
    onClick: () => void
    text?: string
    children?: string | JSX.Element | JSX.Element[] 
}

const MUIButton = ({onClick, text, children}: Props) => {
  return (
    <ThemeProvider theme={theme}>
        <Button onClick={onClick}>{text} {children}</Button>
    </ThemeProvider>
  )
}

export default MUIButton








