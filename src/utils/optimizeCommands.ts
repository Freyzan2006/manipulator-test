
interface IOptimizeCommand {
  command: string
  count: number
}

export const optimizeCommandsClient = (commands: string) : IOptimizeCommand[] => {
    commands = commands.toLocaleUpperCase()

    const commandCount: IOptimizeCommand[] = [];
    const validCommands = ["Л", "П", "В", "Н", "О", "Б"] 
    


    for (let char of commands) {
      if (validCommands.includes(char)) { 
        const existingCommand = commandCount.find(item => item.command === char);
        
        if (existingCommand) {
         
          existingCommand.count += 1;
        } else {
      
          commandCount.push({ command: char, count: 1 });
        }
      }
    }

  
    return commandCount
  
  
};






export const optimizeCommands = (commands: string) : string => {
  let result: string[] = [];  

  let count = 1;  

  for (let i = 1; i < commands.length; i++) {

    if (commands[i] === commands[i - 1]) {
      count++;
    } else {

      result.push(count > 1 ? `${count}${commands[i - 1]}` : `${commands[i - 1]}`);
      count = 1;  
    }
  }


  result.push(count > 1 ? `${count}${commands[commands.length - 1]}` : `${commands[commands.length - 1]}`);

  return result.join('');
};
