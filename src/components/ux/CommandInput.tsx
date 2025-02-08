



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useSendCommandMutation } from '../../store/services/manipulatorApi';
import { setIsMoving, setPosition, placeObject, pickUpObject } from '../../store/slice/manipulatorSlice';

import { useDispatch, useSelector } from 'react-redux';
import { optimizeCommands, optimizeCommandsClient } from '../../utils/optimizeCommands';

import { ISamples } from '../../interface/samples.interface';
import { setShow } from '../../store/slice/SuccessSnackbarSlice';
import { AppDispatch, RootState } from '../../store/store';

interface CommandFormData {
  command: string;
}

const CommandInput: React.FC = () => {
  const { register, handleSubmit } = useForm<CommandFormData>();
  const [sendCommand] = useSendCommandMutation();
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const { position, animationSpeed, gridSize, samples, holdingSample } = useSelector((state: RootState) => state.manipulator);
  
  const dispatch = useDispatch<AppDispatch>();




  const isWithinBounds = (newX: number, newY: number) => {
    return newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize;
  };

 

  const moveManipulatorHandler = (targetPosition: { x: number; y: number }) => {
    dispatch(setIsMoving(true)); 

    const moveInterval = setInterval(() => {
      dispatch(setPosition(targetPosition)); 
      clearInterval(moveInterval); 
      dispatch(setIsMoving(false)); 
    }, animationSpeed);
  };

  const onSubmit = async (data: CommandFormData) => {
    const optimizeCommand = optimizeCommandsClient(data.command);
    const optimizeCommand2 = optimizeCommands(data.command);
    console.log(optimizeCommand);

    let beforeX = position.x
    let beforeY = position.y

    let x = position.x;
    let y = position.y;



    optimizeCommand.forEach(({ command, count }) => {
      switch (command) {
        case 'Л':
          if (isWithinBounds(x - count, y)) {
            x -= count;
          }
          break;
        case 'П':
          if (isWithinBounds(x + count, y)) {
            x += count;
          }
          break;
        case 'В':
          if (isWithinBounds(x, y - count)) {
            y -= count;
          }
          break;
        case 'Н':
          if (isWithinBounds(x, y + count)) {
            y += count;
          }
          break;
        case 'О':
          if ( holdingSample ) {
            alert('Манипулятор уже держит объект');
            break
          }

          // Команда "О" (взять образец)
          // Проверяем, есть ли объект на текущей позиции
          if (samples.some((obj: ISamples) => obj.x === x && obj.y === y)) {
            alert('Взяли');
            dispatch(pickUpObject({x, y})); // Забираем объект
          } else {
            alert('Нет объекта на этой клетке');
          }
          break;
        case 'Б':
          if (holdingSample) {
            alert("Положили объект");
            dispatch(placeObject({x, y}));  // Размещаем объект
          } else {
            alert('Манипулятор не держит объект');
          }
          // alert("Положил")
          // placeObject(x, y)
          break;
        default:
          break;
      }
    });

    moveManipulatorHandler({ x, y });
    console.log(optimizeCommand2);
   
    try {
      const reqData = {command: data.command, optimizeCommand: optimizeCommand2, before: `x: ${beforeX} y: ${beforeY}`, after: `x: ${x} y: ${y}`}
      dispatch(setShow())
      await sendCommand(reqData);
      setCommandHistory([...commandHistory, optimizeCommand2]);
    } catch (error) {
      alert('Ошибка при отправке команды');
    } finally {
      dispatch(setShow())
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: 'auto' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Введите команду</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('command')}
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
