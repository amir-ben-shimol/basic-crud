import React from "react";

import UCardView from "./UCard.view";

interface IProps {
  readonly children: React.ReactNode;
}

const UCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <UCardView children={props.children} />;
};

UCard.displayName = "UCard";
UCard.defaultProps = {};

export default React.memo(UCard);
