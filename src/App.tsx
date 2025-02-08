import React from 'react';
import Login from './components/ux/Login';

import ManipulatorGrid from './components/ui/ManipulatorGrid';
import CommandHistory from './components/ux/CommandHistory';
import { Container, Box } from '@mui/material';
import Rules from './components/ui/Rules';

import SuccessSnackbar from './components/ui/SuccessSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from './store/slice/authSlice';
import { RootState } from './store/store';
import Account from './components/ui/Account';
import CommandInputContainer from './components/ux/CommandInput/CommandInputContainer';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { isShow } = useSelector((state: RootState) => state.successSnackbar)
  const dispatch = useDispatch()
  const handleLogin = () => {
    dispatch(setIsAuthenticated())

  };


  return (

    <Container>
      
      <SuccessSnackbar open = { isShow } message = 'Всё успешно выполнено' />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", widows: 500  }}>
        {!isAuthenticated ? (
          
            <Login onLogin={handleLogin} />
        ) : (
        
          <>
            <Account />
            <Rules />
            <CommandInputContainer />
            
            <ManipulatorGrid />
            <CommandHistory />
          </>
        
          
        )}
      </Box>
     
    </Container>
  );
};

export default App;
