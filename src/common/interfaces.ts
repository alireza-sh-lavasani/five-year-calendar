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
