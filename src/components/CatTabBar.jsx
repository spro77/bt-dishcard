import { ReactComponent as CatBar } from "../assets/catBar.svg";
import s from "../styles.module.scss";
export const CatTabBar = () => {
  return (
    <div className={s.catTabBar}>
      <CatBar />
    </div>
  );
};
