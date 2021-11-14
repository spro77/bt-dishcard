import { motion, useMotionValue } from "framer-motion"
import s from "../styles.module.scss";
import { ReactComponent as IcoBakery } from "../assets/ico-bakery.svg";
import { ReactComponent as Content } from "../assets/content.svg";
import { useRef, useEffect, useState } from "react";
import cx from 'classnames';

export const DishCard = ({ dish, cardIsOpen, cardSetIsOpen, rf, variants, setScrolling }) => {
  const cardRef = useRef(null)
  const shouldExpand = cardIsOpen == dish.id
  const [isAnimFinished, setIsAnimFinished] = useState(false)
  const catTabValue = parseInt(s.catTabValue)
  const cardHeightValue = parseInt(s.cardHeightValue)
  const [top, setTop] = useState(cardHeightValue - 64)

  const timing =.75
  const galleryOpenHeight = window.innerWidth * 1/1
  const contentTop = galleryOpenHeight * 2/3

  const cardTapHandler = (e, id) => {
    e.stopPropagation();
    setScrolling(false);

    if (!cardIsOpen || cardIsOpen != dish.id) {
      cardSetIsOpen(id)
      setIsAnimFinished(false)
    } else cardSetIsOpen(null)

    !cardIsOpen && rf.current.scrollBy({
      top: cardRef.current.getBoundingClientRect().top - cardHeightValue/2 - catTabValue,
      left: 0,
      behavior: 'smooth'
    })
  };

  const containerAnim = {
    hidden: shouldExpand ? {top: null} : {top: contentTop},
    show: shouldExpand ? {top: contentTop} : {top: cardHeightValue - 64}
  }

  return (
    <motion.div
      className={s.dishCard}
      ref={cardRef}
      variants={variants}
      animate={{
        height: shouldExpand ? window.innerHeight - cardHeightValue : cardHeightValue,
        transition: {
          duration: timing
        }
      }}
      onClick={(e) => cardTapHandler(e, dish.id)}
      onAnimationComplete={()=>{
        !shouldExpand && setIsAnimFinished(true)
        setScrolling(true)
      }}
      style={{
            backgroundImage: (!isAnimFinished ?
              `url(https://ik.imagekit.io/fuu3buevyij/bt/${dish.id}.webp?tr=bl-10)`: false),
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'content',
          }}
    >
      <div className={s.tags}>
        {dish.tags.map((t, i) => (
          <div key={t + i} className={s.tag}>
            {t}
          </div>
        ))}
      </div>
      <motion.div
        className={s.contentContainer}
        variants={containerAnim}
        initial="hidden"
        animate="show"
        transition={{ duration: timing }}
        // animate={{top: top}}
        // style={{ top }}
      >
        <div className={s.header}>
          <div className={s.dishIcon}>
            <IcoBakery />
          </div>
          <div className={s.title}>{dish.title}</div>
          <div className={s.priceBlock}>{dish.price}</div>
        </div>
        {!isAnimFinished && <div className={s.content} onClick={(e)=>{e.stopPropagation()}}>
          <Content />
        </div>}
      </motion.div>
      <motion.div
        className={s.gallery}
        animate={shouldExpand ? {
          height: galleryOpenHeight
        } : null}
        transition={{duration: timing}}
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
