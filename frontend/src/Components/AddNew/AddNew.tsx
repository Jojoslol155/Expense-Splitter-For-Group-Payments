import { Box, Divider } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'
import './AddNew.css'

type Props = {
    setOpen: (isOpen: boolean) => void
}
export const  AddNew = ({ setOpen }: Props) => {

    return (
        <Box>
            <div className='alignRight'>
                <MUIButton isDisabled={false} onClick={() => {
                    setOpen(true)
                }} text={"Create New"}/>
            </div>
            <Divider sx={{ background: 'var(--primary)', marginTop: '10px', marginBottom: '20px', padding: '3px' }} />
        </Box>
    )
}
export default AddNew