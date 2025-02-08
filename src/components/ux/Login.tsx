import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../store/slice/authSlice';
import { authConfig } from '../../config/authConfig';



interface LoginFormData {
  username: string;
  password: string;
}

interface IProps {
  onLogin: () => void 
}

const Login: React.FC<IProps> = ({ onLogin }) => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const dispatch = useDispatch()

  const onSubmit = (data: LoginFormData) => {
    if (data.username === authConfig.USERNAME && data.password === authConfig.PASSWORD) {
      dispatch(setUserName(data.username))
      
      onLogin();
    } else {
      alert('Неверный логин или пароль!');
    }
   
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 300}}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Авторизация</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('username')}
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('password')}
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>Войти</Button>
      </form>
    </Box>
  );
};

export default Login;
