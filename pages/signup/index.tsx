import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/api";

import { signUpError } from "../../api/error";
import { signIn } from "../../modules/auth";
import styles from "../login/loginAndSignup.module.scss";

const Signup = () => {
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setUserId(target.value);
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setUsername(target.value);
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setEmail(target.value);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setPassword(target.value);

  const onSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api._signup({
        user_id,
        username,
        email,
        password,
      });
      dispatch(signIn);
      console.log(data);
    } catch (e) {
      if (axios.isAxiosError(e)) signUpError(e);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSignUp}>
        <label htmlFor="user_id">
          유저 아이디
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={user_id}
            onChange={onUserIdChange}
          />
        </label>
        <label htmlFor="username">
          유저 네임
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onUsernameChange}
          />
        </label>
        <label htmlFor="email">
          이메일
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChange}
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
