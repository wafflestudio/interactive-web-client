import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, PutmeRequest } from "../../api/api";
import { RootState } from "../../modules";
import { setUser } from "../../modules/user";

const User = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<PutmeRequest>({});
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setInput({ ...input, username: target.value });
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setInput({ ...input, email: target.value });

  const onModify: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api._putme(input);
      dispatch(setUser({ ...data, isLoggedIn: true }));
    } catch (e) {
      console.log(e);
    }
  };
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    setInput({ username: user.username, email: user.email });
  }, []);

  return (
    <form onSubmit={onModify}>
      <label htmlFor="user_id">
        새 이름
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={input.username}
          onChange={onUsernameChange}
        />
      </label>
      <label htmlFor="user_id">
        새 이메일
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={input.email}
          onChange={onEmailChange}
        />
      </label>
      <button type="submit">수정</button>
    </form>
  );
};

export default User;
