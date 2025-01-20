export interface IResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Adding the user property to the Request interface
      headers:{
        authorization?: string;  // Adding the authorization header to the Request interface
      }
    }
  }
}