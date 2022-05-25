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
    if (user.username && user.email) {
      setInput({
        username: user.username,
        email: user.email,
      });
    }
  }, []);

  return (
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
  );
};

export default User;
