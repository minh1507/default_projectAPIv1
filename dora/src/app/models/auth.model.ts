import { error } from "./error.model"


interface valueLogin{
  value: {
    username: string,
    role: string,
    accessToken: string,
    refreshToken: string
  },
  msg: string
}

export interface login{
  success: valueLogin[],
  errors: error[]
}


