import s from "../styles.module.scss";
import { DishCard } from "./DishCard";

export const DishList = ({ state }) => {
  return (
    <div className={s.dishList}>
      {state.map((dish, i) => (
        <DishCard key={dish.title + i} id={i} dish={dish} />
      ))}
    </div>
  );
};
