import { motion } from "framer-motion"
import s from "../styles.module.scss";
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { useRef, useEffect, useState } from "react";
import cx from 'classnames';

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

    rf.current.scrollBy({
      top: cardRef.current.getBoundingClientRect().top - cardHeightValue/2 - catTabValue,
      left: 0,
      behavior: 'smooth'
    })
  };
  return (
    <motion.div
      layout
      ref={cardRef}
      variants={variants}
      animate={{
        height: shouldExpand ? window.innerHeight - cardHeightValue: null,
        transition: {
          duration: 1
        }
      }}
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
      </div>
      <motion.div
        animate={shouldExpand ? {
          height: window.innerHeight/2 - 16
        } : null}
        transition={{duration: 1}}
        className={s.gallery}
      >
        <motion.div
          layout
          className={s.img}
          style={{
            backgroundImage: `${shouldExpand ? `url(./${dish.id}.jpg), ` : ''}url(./thmbl-${dish.id}.jpg)`,
            backgroundPosition: 'center, center',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'cover, cover',
          }}
        />
        {/* <img src={shouldExpand ? `./${dish.id}.jpg` : `./thmbl-${dish.id}.jpg`} loading='lazy'/> */}
      </motion.div>
    </motion.div>
  );
};
