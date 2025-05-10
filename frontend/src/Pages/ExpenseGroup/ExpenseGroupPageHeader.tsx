import {useState} from 'react'
import { Box, ButtonGroup, createTheme, Divider, TextField, ThemeProvider, Typography, Alert } from '@mui/material'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'
import { Delete, Edit } from '@mui/icons-material'
import './ViewExpenseGroup'
import { updateExpenseGroup } from '../../Services'

type Props = {
    header: string
    groupID: number
    setOpenDeleteModal: (isOpen: boolean) => void
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const PageHeader = ({header, setOpenDeleteModal, groupID}: Props) => {
  const [ editingName, setEditingName ] = useState(false)
  const [ name, setName ] = useState(header)
  const [ showAlert, setShowAlert ] = useState(false)

  return (
    <>
    {showAlert && <div className='alertWrapper'>
        <Alert severity='warning' onClose={() => {
          setShowAlert(false)
        }}>
          Expense group name cannot be empty
        </Alert>
      </div>}
    <ThemeProvider theme={darkTheme}>
      <Box>
          <div className='pageHeaderWrapper'>
            {editingName ? (
              <TextField sx={{
                '.MuiInputBase-input': {
                  fontSize: '3rem !important'
                }
              }}value={name} variant="standard" onBlur={() => {
                setEditingName(false)
                if (name == "") {
                  setShowAlert(true)
                } else {
                  setShowAlert(false)
                  updateExpenseGroup(groupID, name)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingName(false)
                  if (name == "") {
                    setShowAlert(true)
                  } else {
                    setShowAlert(false)
                    updateExpenseGroup(groupID, name)
                  }
                }
              }}
              onChange={(e) => {
                setName(e.target.value)
              }}>

                </TextField>
            ) : (
              <Typography variant='h3'>{name == "" ? header : name}</Typography>
            )}
            <div>
              <ButtonGroup>
                <MUIButton isDisabled={false} startIcon={<Edit />} onClick={() => {
                  setName(header)
                  setEditingName(true)
                }} text='Edit'/>
                <MUIButton isDisabled={false} 
                  startIcon={<Delete  />}
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
    </>
  )
}

export default PageHeader