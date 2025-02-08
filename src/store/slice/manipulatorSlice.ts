import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISamples } from '../../interface/samples.interface';
import { getRandomInt } from '../../utils/random';
import { checkCollision } from '../../utils/Collision';


interface ManipulatorState {
  position: { x: number; y: number };
  animationSpeed: number;
  isMoving: boolean;
  gridSize: number
  samples: ISamples[]

  holdingSample: ISamples | null
}



const samples = [
  { id: 1, x: 0, y: 0 },
  { id: 2, x: 1, y: 0 },
  { id: 3, x: getRandomInt(5), y: getRandomInt(5) },
]




const initialState: ManipulatorState = {
  position: { x: 0, y: 0 },
  animationSpeed: 500,
  isMoving: false,
  gridSize: 5,

  samples: samples,

  holdingSample: null
  
};


const manipulatorSlice = createSlice({
  name: 'manipulator',
  initialState,
  reducers: {

    setPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },
   
    setAnimationSpeed(state, action: PayloadAction<number>) {
      state.animationSpeed = action.payload;
    },
   
    setIsMoving(state, action: PayloadAction<boolean>) {
      state.isMoving = action.payload;
    },
  
    moveManipulator(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },

    setSamples(state, action: PayloadAction<ISamples[]>) {
      state.samples = action.payload
    },

    setHoldingSample(state, action: PayloadAction<ISamples | null>) {
      state.holdingSample = action.payload
    },


     
        pickUpObject(state, action: PayloadAction<{ x: number; y: number }>) {
          const { x, y } = action.payload;
          
          const objectToPick = state.samples.find((obj) => obj.x === x && obj.y === y);
    
          if (objectToPick) {
            
            state.holdingSample = objectToPick;
           
            state.samples = state.samples.filter((obj) => obj !== objectToPick);
          } else {
            alert('На этой клетке нет объекта');
          }
        },
    
      
        placeObject(state, action: PayloadAction<{ x: number; y: number }>) {
          const { x, y } = action.payload;
    
       
          if (!checkCollision(state.samples, x, y)) {
            if (state.holdingSample) {
             
              const newObject = { ...state.holdingSample, x, y };
              state.samples.push(newObject);
             
              state.holdingSample = null;
            } else {
              alert('Нечего отпускать, нет объекта');
            }
          } else {
            alert('Эта клетка уже занята');
          }
        },
  },
});


export const {
  setPosition,
  setAnimationSpeed,
  setIsMoving,
  moveManipulator,
  setSamples,
  setHoldingSample,
  pickUpObject,
  placeObject,
} = manipulatorSlice.actions;


export default manipulatorSlice.reducer;
