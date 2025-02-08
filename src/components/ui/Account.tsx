
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Box, Typography } from "@mui/material"



const Account: React.FC = () => {
    const { username } = useSelector((state: RootState) => state.auth)
    return (
        <Box>
            <Typography variant="h4">
            Привет { username } !
            </Typography>
        </Box>
    )
}

export default Account