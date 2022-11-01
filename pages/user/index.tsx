import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PutmeRequest } from "../../api/api";
import { rtkQueryErrorLog } from "../../functions/rtkQueryErrorLog";
import { RootState } from "../../modules";
import {
  useDeleteMeMutation,
  usePutMeMutation,
  usersApi,
} from "../../modules/api/usersApi";
import { setUser } from "../../modules/user";

const User = () => {
  const [input, setInput] = useState<PutmeRequest>({});
  const [id, setId] = useState<string>("");
  const onUserInfoChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setInput({ ...input, [target.name]: target.value });
  const onUserIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setId(target.value);
  };
  const dispatch = useDispatch();
  const [putMe, { data: putMeData, error: putMeError }] = usePutMeMutation();
  const [deleteMe, { error: deleteMeError }] = useDeleteMeMutation();

  const user = useSelector((state: RootState) => state.user);

  const onModify: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await putMe({
        email: input.email || user.email,
        username: input.username || user.username,
      });
      if (putMeData) dispatch(setUser({ ...putMeData, isLoggedIn: true }));
      if (putMeError) rtkQueryErrorLog(putMeError);
    } catch (e) {
      console.log(e);
    }
  };

  const onResign: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await deleteMe();
      if (deleteMeError) rtkQueryErrorLog(deleteMeError);
    } catch (e) {
      console.log(e);
    }
  };

  const onGetUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      if (!isNaN(parseInt(id))) {
        dispatch(usersApi.endpoints.getUser.initiate(parseInt(id)));
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
            name="username"
            value={input.username || user.username}
            onChange={onUserInfoChange}
          />
        </label>
        <label htmlFor="new_email">
          새 이메일
          <input
            type="text"
            id="new_email"
            name="email"
            value={input.email || user.email}
            onChange={onUserInfoChange}
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
