import axios from 'axios'

interface User {
  id: number
  username: string
}

interface SignupResponse extends User {
  accessToken: string
}

const instance = axios.create({
  baseURL: 'URL'
})

const setHeaderToken = (newToken: string | null) => {
  if (newToken) {
    instance.defaults.headers.common['Authentication'] = newToken
  } else {
    delete instance.defaults.headers.common['Authentication']
  }
}

const ACCESS_TOKEN_KEY = 'accessToken'
const loadToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY)
const storeToken = (newToken: string | null) => {
  if (newToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken)
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

export type AccessToken = string

// used later in AuthPage
export const _setAccessToken = (token: AccessToken | null) => {
  setHeaderToken(token)
  storeToken(token)
}
// used later in AuthPage
export const _getAccessToken = () => loadToken()

setHeaderToken(loadToken())
export const api = {
  ping: async () => (await instance.get<string>('/api/ping/')).data,

  _signin: async (email: string, password: string): Promise<AccessToken> => {
    const response = await instance.post<{accessToken: string}>(
      '/api/user/signin/',
      {
        email: email,
        password: password
      }
    )
    return response.data.accessToken
  },

  _signup: async (username: string, email: string, password: string) => {
    const response = await instance.post<SignupResponse>('/api/user/signup/', {
      username: username,
      email: email,
      password: password
    })
    return {
      token: response.data.accessToken,
      userInfo: response.data
    }
  },

  _signout: async () => {
    await instance.post('/api/user/signout/')
  }
}
