import {useRouter} from 'next/router'
import {useState} from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target.value)
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target.value)

  const onLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.push('/pick-a-color-and-draw')
  }

  return (
    <form onSubmit={onLogin}>
      <label htmlFor="email">
        아이디
        <input
          type="text"
          id="email"
          name="email"
          value={username}
          onChange={onUsernameChange}
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
    </form>
  )
}
