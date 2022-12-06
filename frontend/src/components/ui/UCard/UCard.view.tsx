import React from "react";

import classes from "./UCard.module.scss";

interface IProps {
  readonly children: React.ReactNode;
}

const UCardView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["innerCard"]}>{props.children}</div>
    </div>
  );
};

UCardView.displayName = "UCardView";
UCardView.defaultProps = {};

export default React.memo(UCardView);
