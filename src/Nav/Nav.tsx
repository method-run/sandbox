import { HTMLAttributes } from "react";
import classes from "./Nav.module.css";

export const Nav = ({
  className = "",
  ...restProps
}: HTMLAttributes<HTMLElement>) => (
  <nav className={[className, classes.nav].join(" ")} {...restProps} />
);
