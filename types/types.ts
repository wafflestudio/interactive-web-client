export interface UserDataType {
  isLoggedIn: boolean
  user_id: string | null
  username: string | null
  email: string | null
  date_joined: string | null
}

export interface CategoryType {
  id: number
  navigator: string
  name: string
  path: string
}
