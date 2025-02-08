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



// Начальное состояние
const initialState: ManipulatorState = {
  position: { x: 0, y: 0 },
  animationSpeed: 500,
  isMoving: false,
  gridSize: 5,

  samples: samples,

  holdingSample: null
  
};

// Создание среза
const manipulatorSlice = createSlice({
  name: 'manipulator',
  initialState,
  reducers: {
    // Устанавливаем новую позицию
    setPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },
    // Устанавливаем скорость анимации
    setAnimationSpeed(state, action: PayloadAction<number>) {
      state.animationSpeed = action.payload;
    },
    // Устанавливаем состояние движения
    setIsMoving(state, action: PayloadAction<boolean>) {
      state.isMoving = action.payload;
    },
    // Двигаем манипулятор
    moveManipulator(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },

    setSamples(state, action: PayloadAction<ISamples[]>) {
      state.samples = action.payload
    },

    setHoldingSample(state, action: PayloadAction<ISamples | null>) {
      state.holdingSample = action.payload
    },


        // Команда для захвата объекта (проверка на коллизию перед захватом)
        pickUpObject(state, action: PayloadAction<{ x: number; y: number }>) {
          const { x, y } = action.payload;
          // Проверяем, есть ли объект на данной клетке
          const objectToPick = state.samples.find((obj) => obj.x === x && obj.y === y);
    
          if (objectToPick) {
            // Если объект найден, "забираем" его
            state.holdingSample = objectToPick;
            // Удаляем объект из списка samples
            state.samples = state.samples.filter((obj) => obj !== objectToPick);
          } else {
            alert('На этой клетке нет объекта');
          }
        },
    
        // Команда для отпуска объекта (проверка на коллизию перед размещением)
        placeObject(state, action: PayloadAction<{ x: number; y: number }>) {
          const { x, y } = action.payload;
    
          // Проверяем, не занята ли клетка
          if (!checkCollision(state.samples, x, y)) {
            if (state.holdingSample) {
              // Размещаем объект в новых координатах
              const newObject = { ...state.holdingSample, x, y };
              state.samples.push(newObject);
              // Обнуляем состояние "держащего объекта"
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

// Экспорты действий
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

// Экспорт редьюсера
export default manipulatorSlice.reducer;
