import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api, authInstance } from "../api/api";
import { manageTokens } from "../functions/auth";
import { signIn } from "../modules/auth";
import styles from "./loginAndSignup.module.scss";

export const onPing = async () => {
  try {
    const response = await api._ping();
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export default function Login() {
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
      manageTokens(data);
      dispatch(signIn);

      router.push("/");
    } catch (e) {
      console.log(e);
    }
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
        <button type="button" onClick={onPing}>
          핑
        </button>
        <button type="button" onClick={onPing}>
          배포됨?
        </button>
      </form>
    </div>
  );
}
