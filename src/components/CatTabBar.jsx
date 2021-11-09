import { motion } from "framer-motion";
import { ReactComponent as CatBar } from "../assets/catBar.svg";
import s from "../styles.module.scss";
export const CatTabBar = ({cardIsOpen}) => {
  console.log(cardIsOpen);
  return (
    <motion.div
    className={s.catTabBar}
    animate={cardIsOpen ? {height: 0, opacity: 0} : {height: 190, opacity: 1}}
    >
      <CatBar />
    </motion.div>
  );
};
