
// interface IHandlers {
//     name: string

//     url: string
// }

// class ConfigAPI {
//     baseURL: string
//     headers: object
//     handlers: IHandlers[]

//     constructor(baseURL: string, headers: object, handlers: IHandlers[]) {
//         this.baseURL = baseURL
//         this.headers = headers
//         this.handlers handlers
        
//     }
// }

// export const configAPI = new ConfigAPI(
//     "http://localhost:8000",
//     {
//         'Content-Type': 'application/json',
//     },
//     [
//         {
//             name: "Добовление истории",
//             url: "/add_history"
//         }
//     ]
// )