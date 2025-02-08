




import { Button, TextField, Box, Typography } from '@mui/material';
import { CommandFormData } from '../../../interface/command.interface';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';




interface IProps {
  register: UseFormRegister<CommandFormData>;
  handleSubmit: UseFormHandleSubmit<CommandFormData>;
  onSubmit: (data: CommandFormData) => void;
  commandHistory: string[]
}


const CommandInput: React.FC<IProps> = ({register, handleSubmit, onSubmit, commandHistory}) => {


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: 'auto' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Введите команду</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('command', { required: 'Поле обязательно для заполнения' })}
          label="Команда"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>Отправить</Button>
      </form>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">История команд:</Typography>
        <ul>
          {commandHistory.map((command, index) => (
            <li key={index}>{command}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default CommandInput;
