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


export const manipulatorApi = createApi({
  reducerPath: 'manipulatorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://manipulator-test2.onrender.com' }), 
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
        
   
      query: () => ({
        url: '/history',
        method: 'GET',   
      }),
     
    }),
  }),
});

export const { useSendCommandMutation, useFetchHistoryQuery } = manipulatorApi;
