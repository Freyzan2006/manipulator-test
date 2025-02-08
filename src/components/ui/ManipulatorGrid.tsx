import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store'; 
import { setAnimationSpeed } from '../../store/slice/manipulatorSlice';


const ManipulatorGrid: React.FC = () => {
  const { position, animationSpeed, gridSize, samples, holdingSample } = useSelector((state: RootState) => state.manipulator); 
  const dispatch = useDispatch<AppDispatch>(); 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 50px)`, gridGap: '2px' }}>

        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);

      
          const isManipulatorAtPosition = x === position.x && y === position.y;

          
          const isObjectAtPosition = samples.some(obj => obj.x === x && obj.y === y);

          return (
            <Box
              key={index}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: isManipulatorAtPosition ? holdingSample ? "yellow" : 'blue' : isObjectAtPosition ? 'green' : 'lightgray',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isObjectAtPosition ? 'pointer' : 'default',
              }}

            >
              {isObjectAtPosition && (
                <Typography variant="caption" color="white">О</Typography> 
              )}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">Скорость анимации: {animationSpeed} мс</Typography>
        <Slider
          value={animationSpeed}
          min={100}
          max={5000}
          step={50}
          onChange={(_, newValue) => dispatch(setAnimationSpeed(newValue as number))}
          valueLabelDisplay="auto"
        />
      </Box>

    </Box>
  );
};

export default ManipulatorGrid;
