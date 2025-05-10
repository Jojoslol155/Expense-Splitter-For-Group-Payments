import {useState} from 'react'
import { Box, ButtonGroup, createTheme, Divider, TextField, ThemeProvider, Typography } from '@mui/material'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'
import { Delete, Edit } from '@mui/icons-material'
import './Header.css'
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
  console.log("name state")
  console.log(name)
  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
          <div className='pageHeaderWrapper'>
            {editingName ? (
              <TextField value={name} variant="standard" onBlur={() => {
                setEditingName(false)

                updateExpenseGroup(groupID, name)
              }} onChange={(e) => {
                console.log("change")
                console.log(e.target.value)
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
  )
}

export default PageHeader