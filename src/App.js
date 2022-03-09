import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Home from "./Home";
import Quiz from "./Quiz";
import Edit from "./Edit";
import Settings from "./Settings";
import { PractiseCards } from "./PractiseCards";
import NotFound from "./404";

import { Fetch } from "./Fetch";

import { Add } from "./Edit";

import "./layout.css";
import "./style.css";

import { Link } from "react-router-dom";

function App() {
  const [Theme, setTheme] = useState(getCurrent("THEME"));
  const [ThemeStyle, setThemeStyle] = useState(getCurrent("STYLE"));
  const [ThemeColor, setThemeColor] = useState(getCurrent("COLOR"));

  function getCurrent(tamto) {
    try {
      return JSON.parse(localStorage.getItem("THEME"))[tamto];
    } catch (error) {
      localStorage.setItem(
        "THEME",
        JSON.stringify({ THEME: "dark", STYLE: "aurora", COLOR: "color01" })
      );
      return localStorage.getItem("THEME")[tamto];
    }
  }

  function getREALTHEME() {
    if (Theme === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      } else {
        return "light";
      }
    } else {
      return Theme;
    }
  }

  function setThemeSomething(tamto, value) {
    try {
      var themeLocalstorageCopy = JSON.parse(localStorage.getItem("THEME"));
    } catch (error) {
      var themeLocalstorageCopy = JSON.parse(
        '{"THEME":"dark","STYLE":"aurora","COLOR":"color01"}'
      );
    }
    switch (tamto) {
      case "THEME":
        setTheme(value);
        themeLocalstorageCopy["THEME"] = value;
        break;
      case "STYLE":
        setThemeStyle(value);
        themeLocalstorageCopy["STYLE"] = value;
        break;
      case "COLOR":
        setThemeColor(value);
        themeLocalstorageCopy["COLOR"] = value;
        break;
    }

    localStorage.setItem("THEME", JSON.stringify(themeLocalstorageCopy));

    SPUST_ME_JESTLI_CHCES_ABY_TI_FUNGOVAL_CANVAS();
  }

  function SPUST_ME_JESTLI_CHCES_ABY_TI_FUNGOVAL_CANVAS() {
    function restartCanvas() {
      let p = getPallete();

      createCanvas(p[0], p[1], p[2]);
    }
    setTimeout(() => restartCanvas(), 50);
  }

  function createCanvas(backgroundColor, PALLETE, pocetKolecek) {
    // Set variables
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Set resolution
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Pretty selfExplenatory, don't you think??
    function setBg() {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(-100, -100, canvas.width + 1000, canvas.height + 1000);
    }

    class Particle {
      constructor() {
        // Random location on canvas
        this.x = Math.round(Math.random() * canvas.width - 1);
        this.y = Math.round(Math.random() * canvas.height - 1);

        // Radius -- imma change the formula later
        var radius = Math.round(
          (Math.random() * (canvas.width + canvas.height)) / 5 +
            canvas.width / 10
        );
        this.size = radius;

        // Color pallete
        this.pallete =
          PALLETE[Math.round(Math.random() * (PALLETE.length - 1))];
      }

      draw() {
        // Set colour and size of the particle
        ctx.fillStyle = this.pallete;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.filter =
          "blur(" + Math.sqrt(canvas.width * canvas.height) / 10 + "px)";
        ctx.fill();
      }
    }

    // TT

    setBg();

    const particlesArray = [];
    for (let i = 0; i < pocetKolecek; i++) {
      particlesArray.push(new Particle());
    }

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].draw();
    }

    document.body.setAttribute(
      "style",
      "background-image : url(" + canvas.toDataURL("image/png") + ")"
    );
  }

  function getPallete() {
    let bgColor;
    let pallete;

    let appClassList = document.getElementById("App").classList;

    var c_COLOR = "";
    var c_THEME = "";
    var c_STYLE = "";

    for (let i = 0; i < appClassList.length; i++) {
      const classs = appClassList[i];

      if (classs.includes("-theme")) {
        c_THEME = classs.replace("-theme", "");
      }
      if (classs.includes("-style")) {
        c_STYLE = classs.replace("-style", "");
      }
      if (classs.includes("-color")) {
        c_COLOR = classs.replace("-color", "");
      }
    }

    if (c_STYLE == "gradient") {
      if (c_THEME == "light") {
        return ["#ffffff", [], 0];
      }
      if (c_THEME == "dark") {
        return ["#000000", [], 0];
      }
    }
    if (c_STYLE == "aurora") {
      if (c_THEME == "dark") {
        if (c_COLOR == "color01") {
          return ["#19180a", ["#942911", "#9d8420"], 5];
        }
        if (c_COLOR == "color02") {
          return ["#19180a", ["#005599", "#882266"], 5];
        }
      }
      if (c_THEME == "light") {
        if (c_COLOR == "color01") {
          return ["#ffffff", ["#942911", "#9d8420"], 5];
        }
        if (c_COLOR == "color02") {
          return ["#ffffff", ["#005599", "#882266"], 5];
        }
      }
    }

    localStorage.setItem(
      "THEME",
      '{"THEME":"dark","STYLE":"aurora","COLOR":"color02"}'
    );
    return ["#19180a", ["#005599", "#882266"], 5];
  }

  return (
    <div
      id="App"
      className={
        "App " +
        getREALTHEME() +
        "-theme " +
        ThemeStyle +
        "-style " +
        ThemeColor +
        "-color"
      }
    >
      {SPUST_ME_JESTLI_CHCES_ABY_TI_FUNGOVAL_CANVAS()}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="practisecards/:id" element={<PractiseCards />} />
          <Route path="edit/:id" element={<Edit New="false" />} />
          <Route
            path="settings"
            element={
              <Settings
                Theme={Theme}
                changeFunction={setThemeSomething}
                ThemeStyle={ThemeStyle}
                ThemeColor={ThemeColor}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="fetch" element={<Fetch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
