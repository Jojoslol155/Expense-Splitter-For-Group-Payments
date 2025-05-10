import { Box } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'
import { Add } from '@mui/icons-material'

type Props = {
    setOpen: (isOpen: boolean) => void
}
export const  AddNew = ({ setOpen }: Props) => {

    return (
        <Box>
            <MUIButton isDisabled={false} onClick={() => {
                setOpen(true)
            }} text={"Create New"} startIcon={<Add />}/>
        </Box>
    )
}
export default AddNew