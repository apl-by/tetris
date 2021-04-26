import "./App.scss";
import "../generic/Block/Block";
import MainField from "../MainField/MainField";
import { useState, useEffect } from "react";

function App() {
  const [mainField, setMainField] = useState(
    localStorage.getItem("saved-game")
  );
  console.log(mainField);
  // console.log(Object.entries(mainField));
  // Создание стартового объекта состояния игровой области
  useEffect(() => {
    if (localStorage.getItem("saved-game")) return;

    const initialState = {};
    for (let i = 10; i < 210; i++) {
      initialState[`${i}`] = { isActive: false, id: i };
    }
    setMainField(initialState);
  }, []);
  // -------------------------------------------------------------------

  return (
    <div className="app">
      <MainField field={mainField || {}}></MainField>
    </div>
  );
}

export default App;
