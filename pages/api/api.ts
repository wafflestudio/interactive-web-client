import axios from 'axios'

interface LoginRequest {
  user_id: string
  password: string
}

interface SignupRequest extends LoginRequest {
  email: string
  username: string
}

interface PutmeRequest {
  email: string
  username: string
}

interface User {
  id: number
  username: string
}

// interface SignupResponse extends User {
//   accessToken: string
// }

const instance = axios.create({
  baseURL: 'http://iwe-server.shop/api/v1'
})

// const setHeaderToken = (newToken: string | null) => {
//   if (newToken) {
//     instance.defaults.headers.common['Authorization'] = newToken
//   } else {
//     delete instance.defaults.headers.common['Authorization']
//   }
// }

// const ACCESS_TOKEN_KEY = 'accessToken'
// const loadToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY)
// const storeToken = (newToken: string | null) => {
//   if (newToken) {
//     localStorage.setItem(ACCESS_TOKEN_KEY, newToken)
//   } else {
//     localStorage.removeItem(ACCESS_TOKEN_KEY)
//   }
// }

// export type AccessToken = string

// // used later in AuthPage
// export const _setAccessToken = (token: AccessToken | null) => {
//   setHeaderToken(token)
//   storeToken(token)
// }
// // used later in AuthPage
// export const _getAccessToken = () => loadToken()

// setHeaderToken(loadToken())

export const api = {
  ping: async () => {
    const response = await instance.get('http://iwe-server.shop/ping/')
    return response
  },

  _signup: async ({user_id, username, email, password}: SignupRequest) => {
    const response = await instance.post<User>('/signup/', {
      user_id,
      username,
      email,
      password
    })
    return response
  },

  _login: async ({user_id, password}: LoginRequest) => {
    const response = await instance.post<User>('/login/', {
      user_id,
      password
    })
    return response
  },

  _getme: async () => {
    const response = await instance.get<User>('/users/me/')
    return response
  },

  _putme: async ({username, email}: PutmeRequest) => {
    const response = await instance.put<User>('/users/me/', {username, email})
    return response
  },

  _deleteme: async () => {
    await instance.delete<User>('/users/me/')
    return
  },

  _getuser: async (id: number) => {
    const response = await instance.get<User>(`/users/${id}/`)
    return response
  }
}
