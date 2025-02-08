import { useForm } from "react-hook-form";
import CommandInput from "./CommandInput"
import { useState } from "react";
import { useFetchHistoryQuery, useSendCommandMutation } from "../../../store/services/manipulatorApi";
import { useDispatch, useSelector } from "react-redux";
import { pickUpObject, placeObject, setIsMoving, setPosition } from "../../../store/slice/manipulatorSlice";
import { optimizeCommands, optimizeCommandsClient } from "../../../utils/optimizeCommands";
import { setShow } from "../../../store/slice/SuccessSnackbarSlice";
import { ISamples } from "../../../interface/samples.interface";
import { AppDispatch, RootState } from "../../../store/store";
import { CommandFormData } from "../../../interface/command.interface";






const CommandInputContainer: React.FC = () => {
    const { register, handleSubmit } = useForm<CommandFormData>();
    const [sendCommand] = useSendCommandMutation();
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
    const { position, animationSpeed, gridSize, samples, holdingSample } = useSelector((state: RootState) => state.manipulator);
    
    const dispatch = useDispatch<AppDispatch>();
  
  
    const { refetch } = useFetchHistoryQuery();
  
  
  
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
  
            if (samples.some((obj: ISamples) => obj.x === x && obj.y === y)) {
              alert('Взяли');
              dispatch(pickUpObject({x, y})); 
            } else {
              alert('Нет объекта на этой клетке');
            }
            break;
          case 'Б':
            if (holdingSample) {
              alert("Положили объект");
              dispatch(placeObject({x, y}));  
            } else {
              alert('Манипулятор не держит объект');
            }
          
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
        refetch()
      }
    };

    return (
        <CommandInput 
        register = { register } 
        handleSubmit = { handleSubmit } 
        onSubmit = { onSubmit }
        commandHistory = { commandHistory }
        />
    )
}

export default CommandInputContainer