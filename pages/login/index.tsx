import { NextPage } from "next";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api, authInstance } from "../../api/api";
import { loginError } from "../../api/error";
import { manageTokens, removeTokens } from "../../functions/auth";
import { signIn } from "../../modules/auth";
import { removeUser } from "../../modules/user";
import styles from "./loginAndSignup.module.scss";

const Login: NextPage = () => {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setUserId(target.value);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setPassword(target.value);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api._login({ user_id, password });
      console.log(data);
      manageTokens(data.token);
      dispatch(signIn());
      await router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) loginError(e);
    }
  };
  const onLogout: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    dispatch(removeUser());
    removeTokens();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onLogin}>
        <label htmlFor="user_id">
          아이디:
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={user_id}
            onChange={onUserIdChange}
          />
        </label>
        <label htmlFor="password">
          비밀번호:
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
        <button type="submit">로그인</button>
        <button onClick={onLogout}>로그아웃</button>
      </form>
    </div>
  );
};

export default Login;
