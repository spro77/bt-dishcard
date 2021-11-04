import { useEffect } from "react";
import axios from "axios";
import s from "./styles.module.scss";
import { StatusBar } from "./components/StatusBar";
import { CatTabBar } from "./components/CatTabBar";
import { Footer } from "./components/Footer";
import { useState } from "react";

export default function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // fetch("")
    //   .then((response) => {
    //     if (response.ok) {
    //       return JSON.parse(response);
    //     }
    //     throw response;
    //   })
    //   .then((data) => console.log(data))
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //   });
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
        <div className={s.dishList}></div>
        <Footer />
      </div>
    </div>
  );
}
