import { useEffect } from "react";
import axios from "axios";
import s from "./styles.module.scss";
import { StatusBar } from "./components/StatusBar";
import { CatTabBar } from "./components/CatTabBar";
import { DishList } from "./components/DishList";
import { Footer } from "./components/Footer";
import { useState } from "react";

export default function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get("./data.JSON")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  return (
    <div className={s.app}>
      <div className={s.phoneFrame}>
        <StatusBar />
        <CatTabBar />
        {state.length && <DishList state={state} />}
        <Footer />
      </div>
    </div>
  );
}
