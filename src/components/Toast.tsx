import { motion } from "motion/react";
import { Toast as ToastPropsType } from "../core/types.js";

export const Toast = ({
  id,
  title,
  message,
  type,
  ...props
}: ToastPropsType) => {
  return <motion.div></motion.div>;
};
