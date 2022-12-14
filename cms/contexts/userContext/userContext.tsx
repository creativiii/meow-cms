import React, { useContext } from "react";
import Login from "../../pages/login";
import { useGithubToken, useGithubUser } from "../../queries/auth";
import ctxt from "./context";

export const useUser = () => {
  const user = useContext(ctxt);

  return user;
};

const UserContextProvider = ctxt.Provider;

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const tokenQuery = useGithubToken();

  const { data, isSuccess, isLoading } = useGithubUser(tokenQuery.data);

  if (tokenQuery.isLoading || isLoading) {
    return <>Loading...</>;
  }

  if (!isSuccess) {
    return <Login />;
  }

  return <UserContextProvider value={data!}>{children}</UserContextProvider>;
};
