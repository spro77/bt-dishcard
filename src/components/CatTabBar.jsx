import { motion } from "framer-motion";
import { ReactComponent as CatBar } from "../assets/catBar.svg";
import s from "../styles.module.scss";
export const CatTabBar = ({cardIsOpen}) => {
  return (
    <motion.div
    className={s.catTabBar}
    animate={cardIsOpen ? {height: 0} : null}
    >
      <CatBar />
    </motion.div>
  );
};
