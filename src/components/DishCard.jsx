import { motion } from "framer-motion"
import s from "../styles.module.scss";
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { useRef, useEffect, useState } from "react";
import cx from 'classnames';

export const DishCard = ({ dish, cardIsOpen, cardSetIsOpen, rf, variants, setScrolling }) => {
  const cardRef = useRef(null)
  const shouldExpand = cardIsOpen == dish.id
  const catTabValue = parseInt(s.catTabValue)
  const cardHeightValue = parseInt(s.cardHeightValue)

  const cardTapHandler = (e, id) => {
    e.stopPropagation();
    setScrolling(false);

    if (!cardIsOpen || cardIsOpen != dish.id) cardSetIsOpen(id)
    else cardSetIsOpen(null)

    !cardIsOpen && rf.current.scrollBy({
      top: cardRef.current.getBoundingClientRect().top - cardHeightValue/2 - catTabValue,
      left: 0,
      behavior: 'smooth'
    })
  };
  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      animate={{
        height: shouldExpand ? window.innerHeight - cardHeightValue : cardHeightValue,
        transition: {
          duration: 1
        }
      }}
      className={s.dishCard}
      onClick={(e) => cardTapHandler(e, dish.id)}
      onAnimationComplete={()=>{setScrolling(true);}}
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
        <div className={s.dishIcon}>
          <IcoBakery />
        </div>
        <div className={s.title}>{dish.title}</div>
        <div className={s.priceBlock}>{dish.price}</div>
      </div>
      <motion.div
        className={s.gallery}
        animate={shouldExpand ? {
          height: window.innerHeight/2 - 16
        } : null}
        transition={{duration: 1}}
      >
        <motion.div
          className={s.img}
          layout
          style={{
            backgroundImage: (shouldExpand ?
              `url(https://ik.imagekit.io/fuu3buevyij/bt/${dish.id}.webp${`?tr=w-${window.innerWidth * 2}`}), `:'') +
              `url(https://ik.imagekit.io/fuu3buevyij/bt/${dish.id}.webp${`?tr=w-${window.innerWidth - 16}`})`,
            backgroundPosition: 'center, center',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'cover, cover',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
