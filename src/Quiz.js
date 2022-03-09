import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { LanguageOneTxt } from "./Cards";
import { useState } from "react";
import { Link } from "react-router-dom";

const Quiz = () => {
  let { id } = useParams();
  let obj = JSON.parse(localStorage.getItem(id));

  const title = obj.title;
  const dict = obj.dict;

  var dictIsValid = true;
  if (dict.length < 4) {
    dictIsValid = false;
  }
  console.log(id);

  return (
    <>
      <NavBar
        M_txt={title}
        L_icon="home"
        R_icon="card"
        L_link="/"
        R_link={"/practisecards/" + id}
      />
      {dictIsValid && <QuizWidget dict={dict} />}
      {!dictIsValid && <InvalidDictWidget id={id} />}
    </>
  );
};

export const QuizWidget = ({ dict }) => {
  const [recentWordsID, setRecentWordsID] = useState([]);

  const [styleOne, setStyleOne] = useState("");
  const [styleTwo, setStyleTwo] = useState("");
  const [styleThree, setStyleThree] = useState("");
  const [styleFour, setStyleFour] = useState("");

  const [started, setStarted] = useState(false);

  const [title, settitle] = useState("title");
  const [answers, setAnswers] = useState([]);
  const [correctID, setCorrectID] = useState(99);

  const [isNextShown, setIsNextShown] = useState(false);

  // Generate random number
  function genRandomID(keepTrack) {
    var copy = recentWordsID;

    // Maintain the lenght
    if (recentWordsID.length === 4) {
      copy.shift();
    }

    function myIncludes(numero) {
      if (copy.length === 0) {
        return false;
      }
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] == numero) {
          return true;
        }
      }
      return false;
    }

    // Generate random number
    let number = undefined;
    do {
      number = Math.floor(Math.random() * dict.length);
    } while (myIncludes(number.toString()) && keepTrack);

    // Add the number to the KeepTrack array
    if (keepTrack) {
      copy.push(number);
    }

    return number;
  }

  function getAnswers(currentID, answerLanguage) {
    let answers = [];
    // Generate random answerIDs
    let wrong_answersID = [];
    while (wrong_answersID.length < 3) {
      let n = genRandomID(false);
      if (n !== currentID && !wrong_answersID.includes(n)) {
        wrong_answersID.push(n);
      }
    }

    // Use IDs to create verbal answers
    let title = "";
    let correctID = Math.round(Math.random() * 3);
    setCorrectID(correctID);
    if (answerLanguage == "CZ") {
      for (let id = 0; id < wrong_answersID.length; id++) {
        answers.push(dict[wrong_answersID[id]].WordCzech);
      }

      answers.splice(correctID, 0, dict[currentID].WordCzech);
      title = dict[currentID].WordOther;
    } else {
      for (let id = 0; id < wrong_answersID.length; id++) {
        answers.push(dict[wrong_answersID[id]].WordOther);
      }
      title = dict[currentID].WordCzech;
      answers.splice(correctID, 0, dict[currentID].WordOther);
    }
    setAnswers(answers);
    settitle(title);
    return { answers: answers, correctID: correctID, title: title };
  }

  function revealCorrectAnswer(index) {
    setIsNextShown(true);

    if (index !== correctID) {
      switch (index) {
        case 0:
          setStyleOne("wrong");
          break;
        case 1:
          setStyleTwo("wrong");
          break;
        case 2:
          setStyleThree("wrong");
          break;
        case 3:
          setStyleFour("wrong");
          break;
      }
    }
    switch (correctID) {
      case 0:
        setStyleOne("correct");
        break;
      case 1:
        setStyleTwo("correct");
        break;
      case 2:
        setStyleThree("correct");
        break;
      case 3:
        setStyleFour("correct");
        break;
    }
  }

  function nextQuiestion() {
    setStyleOne("");
    setStyleTwo("");
    setStyleThree("");
    setStyleFour("");

    setIsNextShown(false);

    const CURRENTID = genRandomID(true);

    const { answers, correctID, title } = getAnswers(CURRENTID);

    return {
      answers: answers,
      CURRENTID: CURRENTID,
      correctID: correctID,
      title: title,
    };
  }

  if (!started) {
    console.log("zacinam hru");
    const { answers, CURRENTID, correctID, title } = nextQuiestion();
    setStarted(true);
  } else {
    console.log("aspon neco");
    console.log(recentWordsID);
  }

  return (
    <div className="content content-padding">
      <LanguageOneTxt title={title} />

      <div className="translate-choices">
        <div
          className={"choice-card " + styleOne}
          onClick={() => revealCorrectAnswer(0)}
        >
          <p className="marker">A)</p>
          <p className="card-title">{answers[0]}</p>
        </div>

        <div
          className={"choice-card " + styleTwo}
          onClick={() => revealCorrectAnswer(1)}
        >
          <p className="marker">B)</p>
          <p className="card-title">{answers[1]}</p>
        </div>

        <div
          className={"choice-card " + styleThree}
          onClick={() => revealCorrectAnswer(2)}
        >
          <p className="marker">C)</p>
          <p className="card-title">{answers[2]}</p>
        </div>

        <div
          className={"choice-card " + styleFour}
          onClick={() => revealCorrectAnswer(3)}
        >
          <p className="marker">D)</p>
          <p className="card-title">{answers[3]}</p>
        </div>
      </div>

      <div className="center-right fine-padding">
        {isNextShown && (
          <div
            className={"icon i-arrow-simple-right  "}
            onClick={() => nextQuiestion()}
          ></div>
        )}
      </div>
    </div>
  );
};

export const InvalidDictWidget = ({ id }) => {
  return (
    <div className="content content-padding">
      <h2>OOPS...</h2>
      <p>Vypadá to, že tato lekce nemá dostatečný počet slovíček(4)</p>
      <p>
        Upravit ji můžete<Link to={"/edit/" + id}>Zde</Link>
      </p>
    </div>
  );
};

export default Quiz;
