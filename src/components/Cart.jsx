import s from "../styles.module.scss";
import { motion } from "framer-motion"
import { ReactComponent as TablePicto } from '../assets/table.svg'
import { ReactComponent as AddedDishes } from '../assets/added-dishes.svg'


export const Cart = ({cartAnim}) => {
  console.log(cartAnim);
  return (
    <motion.div
    className={s.cart}
    variants={cartAnim}
    initial="hidden"
    animate="show"
    >
      <TablePicto />
      <AddedDishes />
    </motion.div>
  )
}
