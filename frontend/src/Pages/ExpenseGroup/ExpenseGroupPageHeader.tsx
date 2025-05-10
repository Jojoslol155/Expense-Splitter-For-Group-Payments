import {useState} from 'react'
import { Box, ButtonGroup, createTheme, Divider, TextField, ThemeProvider, Typography } from '@mui/material'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'

type Props = {
    header: string
    setOpenDeleteModal: (isOpen: boolean) => void
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const PageHeader = ({header, setOpenDeleteModal}: Props) => {
  const [ editingName, setEditingName ] = useState(false)

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
          <div className='pageHeaderWrapper'>
            {editingName ? (
              <TextField defaultValue={header} variant="standard">

                </TextField>
            ) : (
              <Typography variant='h3'>{header}</Typography>
            )}
            <div>
              <ButtonGroup>
                <MUIButton onClick={() => {
                  setEditingName(true)
                }} text='Edit'/>
                <MUIButton 
                  onClick={() => {
                    setOpenDeleteModal(true)
                  }}
                  text='Delete'
                  />
              </ButtonGroup>
            </div>
          </div> 
          <Divider sx={{ background: '#1D273B', padding: '3px', borderBottomWidth: '0'}} />
      </Box>
    </ThemeProvider>
  )
}

export default PageHeader