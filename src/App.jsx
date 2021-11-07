import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import s from "./styles.module.scss";
import { StatusBar } from "./components/StatusBar";
import { CatTabBar } from "./components/CatTabBar";
import { DishCard } from './components/DishCard'
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";

export default function App() {
  const [dishes, setDishes] = useState();
  const [cardIsOpen, cardSetIsOpen] = useState(null);
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
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        // delayChildren: 1,
      }
    }
  }

  const dishAnim = {
    hidden: {
      marginBottom: 100,
      scale: .85
    },
    show: {
      marginBottom: 8,
      // height: cond ? 440 : null,
      scale: 1,
      transition: {
        // delay: 1,
        type: "spring",
        bounce: .3
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
      bottom: 28,
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
      <div className={s.phoneFrame}>
        <StatusBar />
        <CatTabBar />
        <Cart cartAnim={cartAnim}/>
        { dishes &&
          <motion.div
          variants={dishListAnim}
          initial="hidden"
          animate="show"
          ref={dishListRef}
          className={s.dishList}
          >
            {dishes.map((dish, i) => (
              <DishCard
              rf={dishListRef}
              key={dish.id}
              dish={dish}
              cardIsOpen={cardIsOpen}
              cardSetIsOpen={cardSetIsOpen}
              variants={dishAnim}
              />
            ))
        }
        </motion.div>}
        <Footer />
      </div>
    </div>
  );
}
