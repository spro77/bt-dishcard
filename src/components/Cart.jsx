import s from "../styles.module.scss";
import { motion } from "framer-motion"
import { ReactComponent as TablePicto } from '../assets/table.svg'
import { ReactComponent as AddedDishes } from '../assets/added-dishes.svg'


export const Cart = ({cartAnim, cardIsOpen}) => {
  return (
    <motion.div
    className={s.cart}
    variants={cartAnim}
    initial="hidden"
    animate="show"
    >
      <motion.button
      className={s.addButton}
      initial={{display: 'none', scale: 0}}
      animate={cardIsOpen ? {display: 'flex', scale: 1} : null}
      transition={{
        type: "spring",
        stiffness: 180
      }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10.5L7.5 18H10.5V10.5H18V7.5H10.5V0H7.5L7.5 7.5H0V10.5H7.5Z"/>
        </svg>
      </motion.button>
      <TablePicto />
      <AddedDishes />
    </motion.div>
  )
}
