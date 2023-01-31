import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const redirect = async () => {
      await router.push(router.asPath + "/0");
    };
    console.log(2);
    redirect();
  }, []);

  return null;
};

export default Index;
