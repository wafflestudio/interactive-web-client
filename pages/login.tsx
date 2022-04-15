import {useState} from 'react'
import {api} from './api/api'

export const onPing = async () => {
  try {
    const response = api.ping()
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

export default function Login() {
  const [user_id, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => setUserId(target.value)
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => setPassword(target.value)

  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      const response = api._login({user_id, password})
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={onLogin}>
      <label htmlFor="user_id">
        아이디
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={user_id}
          onChange={onUserIdChange}
        />
      </label>
      <label htmlFor="password">
        비밀번호
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
      </label>
      <button type="submit">로그인</button>
      <button type="button" onClick={onPing}>
        핑
      </button>
    </form>
  )
}
