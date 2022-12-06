import React from "react";

import Main from "../components/container/Main";

interface IProps {}

const MainPage: React.FC<IProps> = () => {
  console.log("in main page");
  return <Main />;
};

MainPage.displayName = "Main";

export default MainPage;
