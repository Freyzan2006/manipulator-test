import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHistoryCommand } from '../../interface/historyCommand.interface';


interface ISendCommandReq {
  command: string
  optimizeCommand: string
  before: string
  after: string
}

interface ISendCommandRes {
  command: string
}

// https://manipulator-test2.onrender.com
// http://localhost:8000

// Мокаем запросы для локального хранения данных
export const manipulatorApi = createApi({
  reducerPath: 'manipulatorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://manipulator-test2.onrender.com' }), // Используем fakeBaseQuery для имитации запросов
  endpoints: (builder) => ({
    sendCommand: builder.mutation<ISendCommandRes, ISendCommandReq>({
      query: (command: ISendCommandReq) => {
        console.log('Отправляемый запрос:', { command });
        return {
          url: '/add_history', 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: command, 
        }

        },

     
    }),
    fetchHistory: builder.query<IHistoryCommand[], void>({
        
      // Мокаем данные для истории команд
      query: () => ({
        url: '/history', // Путь к вашему эндпоинту
        method: 'GET',   // Метод запроса
      }),
     
    }),
  }),
});

export const { useSendCommandMutation, useFetchHistoryQuery } = manipulatorApi;
