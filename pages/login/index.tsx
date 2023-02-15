import { NextPage } from "next";
import axios, from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, authInstance } from "../../api/api";
import { loginError } from "../../api/error";
import { manageTokens, removeTokens } from "../../functions/auth";
import { RootState } from "../../modules";
import { useGetMeQuery } from "../../modules/api/usersApi";
import { signIn } from "../../modules/auth";
import { removeUser } from "../../modules/user";
import styles from "./loginAndSignup.module.scss";

const Login: NextPage = () => {
  const [user_id, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, status } = useGetMeQuery();
  const [username, setUsername] = useState<string>("");
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const wsStore = useSelector((state: RootState) => state.ws);

  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => setUserId(target.value), []);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => setPassword(target.value), []);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api._login({ user_id, password, auto: isAuto });
      console.log(data);
      manageTokens(data.token);
      dispatch(signIn());
      setUsername(data.user.username);
    } catch (e) {
      if (axios.isAxiosError(e)) loginError(e);
    }
  };
  const onRefresh:React.MouseEventHandler<HTMLButtonElement> = async(e) => {
    e.preventDefault();
    try {
      const { data } = await api._refresh();
      console.log(data);
    } catch (e) {
      if (axios.isAxiosError(e)) loginError(e);
    }
  }
  const onLogout: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    dispatch(removeUser());
    removeTokens();
    setUsername("");
  };

  useEffect(() => {
    if (data) {
      setUsername(data.username);
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>로그인</h1>
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
          <label htmlFor="isAuto">
            <input type="checkbox" checked={isAuto} onClick={() => {
              setIsAuto(!isAuto);
            }}/>
            자동 로그인
          </label>
          <button type="submit">로그인</button>
          <button onClick={onRefresh}>리프레시</button>
          <button onClick={onLogout}>로그아웃</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
