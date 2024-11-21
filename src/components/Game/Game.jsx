import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import game_data, { decrypt } from "./data.js";

const Game = ({ score, setScore, setCurrentPage }) => {
  const leftContainer = useRef(null);
  const rightContainer = useRef(null);
  const rightValue = useRef(null);
  const rightName = useRef(null);
  const leftValue = useRef(null);
  const leftName = useRef(null);
  const higherButton = useRef(null);
  const lowerButton = useRef(null);
  const middleButton = useRef(null);
  const [leftSide, setLeftSide] = useState(null);
  const [rightSide, setRightSide] = useState(null);
  const [gameArray, setGameArray] = useState([]);

  function getRandomNumber() {
    return Math.floor(Math.random() * (game_data.length));
  }

  function generateUniqueRandomNumber(existingNumbers) {
    let randomNumber;
    do {
      randomNumber = getRandomNumber();
    } while (existingNumbers.includes(randomNumber));
    return randomNumber;
  }

  function formatNumberWithCommas(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  function removeCommas(numberString) {
    return parseInt(numberString.replace(/,/g, ""));
  }

  function getImagePath(id) {
    return "/images/" + id + ".jpg";
  }

  useEffect(() => {
    setLeftSide(getRandomNumber());
  }, []);

  useEffect(() => {
    if (leftSide !== null) {
      const newRightSide = generateUniqueRandomNumber(
        gameArray.concat(leftSide)
      );
      setRightSide(newRightSide);
      setGameArray((prevArray) => [...prevArray, leftSide, newRightSide]);
    }
  }, [leftSide]);

  useEffect(() => {
    if (leftSide !== null && rightSide !== null) {
      startGame(leftSide, rightSide);
    }
  }, [leftSide, rightSide]);

  function startGame(left, right) {
    leftContainer.current.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${getImagePath(
      game_data[left][0]
    )}') no-repeat center center / cover`;
    leftName.current.textContent = `"${game_data[left][1]}"`;
    leftValue.current.textContent = formatNumberWithCommas(decrypt(game_data[left][2], game_data[left][0]));

    rightContainer.current.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${getImagePath(
      game_data[right][0]
    )}') no-repeat center center / cover`;
    rightName.current.textContent = `"${game_data[right][1]}"`;
    rightValue.current.textContent = formatNumberWithCommas(decrypt(game_data[right][2], game_data[right][0]));
  }

  function onClick(guess) {
    const leftVal = removeCommas(leftValue.current.textContent);
    const rightVal = removeCommas(rightValue.current.textContent);
    if (
      (guess === "higher" && leftVal <= rightVal) ||
      (guess === "lower" && leftVal >= rightVal)
    ) {
      continueGame();
    } else {
      gameOver();
    }
  }

  function continueGame() {
    lowerButton.current.style.display = "none";
    higherButton.current.style.display = "none";
    setTimeout(() => {
      rightValue.current.style.display = "block";
      middleButton.current.style.backgroundColor = "rgb(82, 229, 82)";
      middleButton.current.textContent = "✔";
      middleButton.current.style.color = "white";
    }, 750);
    setScore(score + 1);
    setTimeout(() => {
      rightValue.current.style.display = "none";
      lowerButton.current.style.display = "block";
      higherButton.current.style.display = "block";
      setLeftSide(rightSide);
      setRightSide(null);
      middleButton.current.style.backgroundColor = "white";
      middleButton.current.textContent = "VS";
      middleButton.current.style.color = "black";
    }, 2000);
  }

  function gameOver() {
    lowerButton.current.style.display = "none";
    higherButton.current.style.display = "none";
    setTimeout(() => {
      rightValue.current.style.display = "block";
      middleButton.current.style.backgroundColor = "rgb(215, 121, 121)";
      middleButton.current.textContent = "✕";
      middleButton.current.style.color = "white";
    }, 750);
    setTimeout(() => {
      setCurrentPage("result");
    }, 2000);
  }

  return (
    <>
      <div className="game">
        <div className="left-container" ref={leftContainer}>
          <p className="high-score">
            High Score: {localStorage.getItem("high-score")}
          </p>
          <h1 className="left-name" ref={leftName}></h1>
          <br />
          <h1 className="left-value" ref={leftValue}></h1>
        </div>
        <div className="right-container" ref={rightContainer}>
          <h1 className="right-name" ref={rightName}></h1>
          <h1 className="right-value" ref={rightValue}></h1>
          <button
            onClick={() => onClick("higher")}
            className="guess-button"
            ref={higherButton}
          >
            Higher <span>▲</span>
          </button>
          <button
            onClick={() => onClick("lower")}
            className="guess-button"
            ref={lowerButton}
          >
            Lower <span>▼</span>
          </button>
          <p className="score">Score: {score}</p>
        </div>
      </div>
      <div className="middle-button" ref={middleButton}>
        VS
      </div>
    </>
  );
};

export default Game;
