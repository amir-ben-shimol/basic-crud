import React from "react";

import Login from "../components/container/Login";

interface IProps {}

const LoginPage: React.FC<IProps> = () => {
  return <Login />;
};

LoginPage.displayName = "Login";

export default LoginPage;
