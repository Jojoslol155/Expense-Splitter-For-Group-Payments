import React from 'react'
import { Modal, Box, Typography, createTheme, ThemeProvider, ButtonGroup, Button } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'

type Props = {
  open: boolean
  style: any
  handleDelete: () => void
  onClose: () => void
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#206BC4"
        },
        mode: 'dark'
    }
})


const DeleteModal = ({open, style, onClose, handleDelete}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" style={{marginBottom:'15px', textAlign: 'center'}}>
              {"Are you sure you want to delete?"}
            </Typography>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <MUIButton isDisabled={false} onClick={onClose} text={"Cancel"}/>
              <Button style={{marginLeft:'15px'}} variant="contained" onClick={handleDelete}>{"Delete"}</Button>
            </div>
          </Box>
      </Modal>
    </ThemeProvider>
  )
}

export default DeleteModal