import s from "../styles.module.scss";
import { motion } from "framer-motion"
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { useState } from "react";

export const DishCard = ({ id, dish }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cardTapHandler = (e) => {
    e.stopPropagation();
    setIsOpen(e.currentTarget.getAttribute("data-id"));
    console.log(isOpen);
  };

  return (
    <motion.div
      animate={{ height: "70%" }}
      data-id={id}
      className={s.dishCard}
      onClick={(e) => cardTapHandler(e)}
    >
      {/* <div className={s.fav}></div> */}
      <div className={s.tags}>
        {dish.tags.map((t, i) => (
          <div key={t + i} className={s.tag}>
            {t}
          </div>
        ))}
      </div>
      <div className={s.content}>
        {/* <div className={s.badge}>{dish.qty}</div> */}
        <div className={s.dishIcon}>
          <IcoBakery />
        </div>
        <div className={s.title}>{dish.title}</div>
        <div className={s.priceBlock}>{dish.price}</div>
        <div className="picture" />
      </div>
    </motion.div>
  );
};
