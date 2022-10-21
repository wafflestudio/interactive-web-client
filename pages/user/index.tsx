import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, PutmeRequest } from "../../api/api";
import { RootState } from "../../modules";
import { setUser } from "../../modules/user";
import { manageTokens } from "../../functions/auth";
import { signIn } from "../../modules/auth";
import { useRouter } from "next/router";

const User = () => {
  const [input, setInput] = useState<PutmeRequest>({});
  const [id, setId] = useState<string>("");
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setInput({ ...input, username: target.value });
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setInput({ ...input, email: target.value });
  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setId(target.value);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.username && user.email) {
      setInput({
        username: user.username,
        email: user.email,
      });
    }
  }, []);

  const onModify: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api._putme(input);
      dispatch(setUser({ ...data, isLoggedIn: true }));
      setInput({});
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onResign: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await api._deleteme();
      manageTokens({ access_token: "" });
      dispatch(signIn);
      await router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onGetUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!isNaN(parseInt(id))) {
        const { data } = await api._getuser(id);
        console.log(data);
        dispatch(setUser({ ...data, isLoggedIn: true }));
        setId("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={onModify}>
        <label htmlFor="new_username">
          새 이름
          <input
            type="text"
            id="new_username"
            name="new_username"
            value={input.username}
            onChange={onUsernameChange}
          />
        </label>
        <label htmlFor="new_email">
          새 이메일
          <input
            type="text"
            id="new_email"
            name="new_email"
            value={input.email}
            onChange={onEmailChange}
          />
        </label>
        <button type="submit">수정</button>
      </form>
      <form onSubmit={onResign}>
        <label htmlFor="confirm_resign">
          탈퇴하시겠습니까?
          <button type={"submit"}>탈퇴</button>
        </label>
      </form>
      <form onSubmit={onGetUser}>
        <label htmlFor="user_id">
          유저 ID
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={id}
            onChange={onUserIdChange}
          />
        </label>
        <button type="submit">다른 유저 조회</button>
      </form>
    </div>
  );
};

export default User;
