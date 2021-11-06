import { useState, useEffect, useRef } from "react";
import axios from "axios";
import s from "./styles.module.scss";
import { StatusBar } from "./components/StatusBar";
import { CatTabBar } from "./components/CatTabBar";
import { DishCard } from './components/DishCard'
import { Footer } from "./components/Footer";

export default function App() {

  console.log('APP LOADED');
  const [state, setState] = useState([]);
  const [cardIsOpen, cardSetIsOpen] = useState(null);
  const dishListRef = useRef(null)

  useEffect(() => {
    axios
      .get("./data.JSON")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={s.app}>
      <div className={s.phoneFrame}>
        <StatusBar />
        <CatTabBar />
        {<div ref={dishListRef} className={s.dishList}>
          {state.map((dish, i) => (
            <DishCard
            rf={dishListRef}
            key={dish.id}
            dish={dish}
            cardIsOpen={cardIsOpen}
            cardSetIsOpen={cardSetIsOpen}
            />
          ))}
        </div>}
        <Footer />
      </div>
    </div>
  );
}
