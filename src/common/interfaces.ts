export interface ISession {
  accessToken?: string
  expires: string
  expires_in: string
  id_token: string
  refresh_token: string
  token_type: string
  user: {
    name: string
    email: string
    image: string
  }
}
export interface IUserInfo {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

export interface IEntryData {
  _id: string
  index: string
  day: number
  month: number
  year: number
  data?: {
    html?: string
    image?: string
    audio?: string
    video?: string
  }
}

export interface INoteCardParams {
  eachYearNote: IEntryData
  fetchData: Function
}
