import { motion } from "framer-motion"
import s from "../styles.module.scss";
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { useRef, useEffect, useState } from "react";

export const DishCard = ({ dish, cardIsOpen, cardSetIsOpen, rf, variants }) => {
  const cardRef = useRef(null)
  const shouldExpand = cardIsOpen == dish.id
  const catTabValue = parseInt(s.catTabValue)
  const cardHeightValue = parseInt(s.cardHeightValue)

  const cardTapHandler = (e) => {
    const id = e.currentTarget.getAttribute("data-id")
    e.stopPropagation();
    if (!cardIsOpen || cardIsOpen != dish.id) cardSetIsOpen(id)
    else cardSetIsOpen(null)


    const diffExp = cardRef.current.getBoundingClientRect().top - cardHeightValue/2 - catTabValue
    const diffCol = cardHeightValue - window.innerHeight/2 + catTabValue

    console.log(shouldExpand, diffExp, ' / ', diffCol);
    rf.current.scrollBy({
      top: shouldExpand ? diffCol : diffExp,
      left: 0,
      behavior: 'smooth'
    })
  };
  return (
    <motion.div
      layout
      ref={cardRef}
      variants={variants}
      animate={{height: shouldExpand ? window.innerHeight - cardHeightValue: null}}
      data-id={dish.id}
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
