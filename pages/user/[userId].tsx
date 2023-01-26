import { useRouter } from "next/router";
import React from "react";
import { useGetUserQuery } from "../../modules/api/usersApi";

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data } = useGetUserQuery(parseInt(userId), {
    skip: typeof userId !== "string",
  });

  return <div>{data?.username}</div>;
};

export default User;
