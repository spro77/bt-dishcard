import s from "../styles.module.scss";
import { motion } from "framer-motion"
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { useRef, useEffect, useState } from "react";

export const DishCard = ({ dish, cardIsOpen, cardSetIsOpen, rf }) => {
  const cardRef = useRef(null)
  const shouldExpand = cardIsOpen == dish.id
  /* useEffect(() => {
    console.log(cardRef.current.offsetHeight);
    if(cardRef && cardID == dish.id) cardRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }, [cardIsOpen])
 */
  const cardTapHandler = (e) => {
    const id = e.currentTarget.getAttribute("data-id")
    e.stopPropagation();
    if (!cardIsOpen || cardIsOpen != dish.id) cardSetIsOpen(id)
    else cardSetIsOpen(null)

    const offsetExp = rf.current.offsetHeight/2 - (cardRef.current.offsetHeight - 270)/2
    const offsetCol = rf.current.offsetHeight/2 - (cardRef.current.offsetHeight + 270)/2

    rf.current.scrollTo({
      top: cardRef.current.offsetTop - (shouldExpand ? offsetExp : offsetCol),
      left: 0,
      behavior: 'smooth'
    })

    /* if(rf) rf.current.scrollTo({
      top: cardOffset - offset,
      left: 0,
      behavior: 'smooth'
    }) */
  };

  return (
    <motion.div
      ref={cardRef}
      animate={shouldExpand ? { height: 440 } : null}
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
