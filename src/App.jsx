import { useState, useEffect, useRef } from "react";
import { motion, useElementScroll, useVelocity } from "framer-motion";
import axios from "axios";
import s from "./styles.module.scss";
import { CatTabBar } from "./components/CatTabBar";
import { DishCard } from './components/DishCard'
import { Cart } from "./components/Cart";

export default function App() {
  const [dishes, setDishes] = useState();
  const [cardIsOpen, cardSetIsOpen] = useState(null);
  const [isScrolling, setScrolling] = useState(true)
  const dishListRef = useRef(null)

  useEffect(() => {
    axios
      .get("./data.JSON")
      .then((res) => {
        setDishes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dishListAnim = {
    show: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const onScrollHandler = () => {
    if (isScrolling && cardIsOpen) {
      cardSetIsOpen(null)
    }
  }

  const dishAnim = {
    hidden: {
      marginBottom: 100,
      scale: .85
    },
    show: {
      marginBottom: 8,
      scale: 1,
      transition: {
        type: "spring",
        bounce: .4
      }
    }
  }

  const cartAnim = {
    hidden: {
      bottom: -30,
      rotateX: 180,
      originY: 1
    },
    show: {
      bottom: 8,
      rotateX: 0,
      originY: 1,
      transition: {
        delay: 1,
        type: "spring",
        stiffness: 180
      }
    }
  }

  return (
    <div className={s.app}>
      <CatTabBar cardIsOpen={Boolean(cardIsOpen)}/>
      <Cart cartAnim={cartAnim} cardIsOpen={Boolean(cardIsOpen)}/>
      { dishes &&
        <motion.div
        onScroll={onScrollHandler}
        className={s.dishList}
        variants={dishListAnim}
        initial="hidden"
        animate="show"
        ref={dishListRef}
        >
          {dishes.map((dish, i) => (
            <DishCard
            rf={dishListRef}
            setScrolling={setScrolling}
            key={dish.id}
            dish={dish}
            cardIsOpen={cardIsOpen}
            cardSetIsOpen={cardSetIsOpen}
            variants={dishAnim}
            onAnimationComplete={()=>setScrolling(true)}
            />
          ))
      }
      </motion.div>}
    </div>
  );
}
