import React, { useEffect, useRef } from "react";
import "./Result.css";

const Result = ({ score, setCurrentPage, setScore }) => {
  const result = useRef(null);
  function getMessage(score) {
    const averageScore = 3.2;
    let message;

    if (score > averageScore + 2) {
      message = "Wow! You must have been practicing in your dreams!";
    } else if (score > averageScore) {
      message = "Nice job! You’re doing better than average. Keep it up!";
    } else if (score === averageScore) {
      message = "Right on the money! You’re as average as they come!";
    } else if (score > averageScore - 2) {
      message = "Not bad! But you might want to put down the pizza next time.";
    } else {
      message = "Ouch! Did you play with your eyes closed?";
    }

    return message;
  }

  function setImage(score) {
    const averageScore = 2;
    if (score > averageScore + 2) {
      return `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/result/5.jpeg') no-repeat center center / cover`;
    } else if (score > averageScore) {
      return `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/result/4.jpg') no-repeat center center / cover`;
    } else if (score === averageScore) {
      return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url('/result/3.jpg') no-repeat center center / cover`;
    } else if (score > averageScore - 2) {
      return `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/result/2.jpeg') no-repeat center center / cover`;
    } else {
      return `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/result/1.jpg') no-repeat center center / cover`;
    }
  }

  useEffect(() => {
    result.current.style.background = setImage(score);
  }, []);

  function buttonClick (page) {
    setScore(0);
    setCurrentPage(page);
  }

  return (
    <div className="result" ref={result}>
      <h2>You scored:</h2>
      <h1>{score}</h1>
      <p>The average score is 3.2.</p>
      <p>{getMessage(score)}</p>
      <br />
      <br />
      <div className="buttons">
        <button onClick={() => buttonClick("home")}>Back to home</button>
        <button onClick={() => buttonClick("game")}>Play again</button>
      </div>
    </div>
  );
};

export default Result;