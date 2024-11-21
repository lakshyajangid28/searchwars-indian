import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Result from "./components/Result/Result";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");

  if (!localStorage.getItem("high-score")) {
    localStorage.setItem("high-score", 0);
  }

  useEffect(() => {
    localStorage.getItem("high-score") < score ? localStorage.setItem("high-score", score) : null;
  }, [score]);

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Home setCurrentPage={setCurrentPage} />
      ) : (
        <></>
      )}
      {currentPage === "game" ? (
        <Game
          setCurrentPage={setCurrentPage}
          score={score}
          setScore={setScore}
        />
      ) : (
        <></>
      )}
      {currentPage === "result" ? (
        <Result score={score} setScore={setScore} setCurrentPage={setCurrentPage} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
