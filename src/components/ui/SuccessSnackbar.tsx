import React from 'react';
import { Snackbar } from '@mui/material';

interface ISuccessSnackbar {
  open: boolean; 
  message: string
}

const SuccessSnackbar: React.FC<ISuccessSnackbar> = ({ open, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      message={message}
    />
  );
};

export default SuccessSnackbar