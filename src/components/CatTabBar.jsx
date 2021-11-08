import { motion } from "framer-motion";
import { ReactComponent as CatBar } from "../assets/catBar.svg";
import s from "../styles.module.scss";
export const CatTabBar = ({cardIsOpen}) => {
  console.log(cardIsOpen);
  return (
    <motion.div
    className={s.catTabBar}
    animate={cardIsOpen ? {y: -200, display: 'none'} : null}
    >
      <CatBar />
    </motion.div>
  );
};
