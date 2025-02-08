import { Box, Typography } from "@mui/material"
import { commandsController } from "../../config/typeCommand"


const Rules: React.FC = () => {
    return (
        <Box sx={{ border: 1 }} p={ 2 }>
            <Typography variant="h3" component="h2">
                Правила
            </Typography>
            <ul>
                <li>Синея клетка: Это кран (Пустой)</li>
                <li>Жёлтая клетка: Это кран (С образцом)</li>
                <li>Зелёный квадрат с нулём: Это образец </li>
            </ul>
            
            <ul>
                <li>налево: { commandsController.left } </li>
                <li>направо: { commandsController.right } </li>
                <li>вверх: { commandsController.top } </li>
                <li>вниз: { commandsController.bottom } </li>
                <li>взять образец: { commandsController.take } </li>
                <li>отпустить образец: { commandsController.noTake } </li>
            </ul>
        </Box>
    )
}

export default Rules