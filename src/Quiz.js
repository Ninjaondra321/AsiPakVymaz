import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { LanguageOneTxt } from './Cards';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getByDisplayValue } from '@testing-library/react';

import { useEffect } from 'react';
import axios from 'axios';


const Quiz = () => {
  let {id} = useParams()
  let obj = JSON.parse(localStorage.getItem(id))

  const [Title, setTitle] = useState('')
  const [baseURL, setBaseURL] = useState('')
  const [Dict, setDict] = useState([])

  const [FetchedData, setFetchedData] = useState('')

  if (Title === '') {setTitle(obj.title)}


  // Fetch data and set the value to the FetchData variable
  async function fetchData () {
    fetch(obj.listURL)
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	console.log(data);
    setFetchedData(data)
  })
  }


  // Function, that returns dict
  function getDict() {
    if (FetchedData === "") {fetchData()}
    console.log(fetchData.dict)
    return fetchData.dict
  }

  // FUction that returns the base url
  function getBaseURL() {
    if (FetchedData === "") {fetchData()}
    console.log(fetchData.baseURL)
    return fetchData.baseURL
  }

  // TODO: TOHLE PAK DODĚLEJ
  const dictIsValid = true

  const [AhojPakVymaz, setAhojPakVymaz] = useState(null)

  console.log("fetchong...")
  console.log(obj.listURL)
 useEffect(() => {
   fetch(obj.listURL)
   .then(res => {
     return res.json()
   })
   .then((data) => {
     console.log('AASHDASKJJASJFgakjsbfjkskjay')
    console.log(data)
    
    setAhojPakVymaz([data.dict])
   })
 }, [])

  console.info(Dict)


  return <>
      <NavBar M_txt={Title} L_icon="arrow-simple-left" R_icon="card" L_link="/" R_link={'/practisecards/' + id}/>
      {AhojPakVymaz && <h1>{AhojPakVymaz}</h1>}
    {!dictIsValid && <InvalidDictWidget id={id}/>}



  </>;
};



function DataFetching (obj) {

  const [Dict, setDict] = useState([])
  const [baseURL, setBaseURL] = useState('')

  useEffect(() =>  {
    axios.get(obj.listURL)
    .then(res => {

      console.log(res.data.dict)
      setDict(res.data.dict)
      console.log('Podemnou je dicttsadskjsadkjgkfskkj')
      for (let i = 0; i < res.data.dict.length; i++) {
        const element = res.data.dict[i];
        setDict(Dict.push(element))
      }

      setBaseURL(res.data.baseURL)
      console.error(Dict)
    }).catch(err => {
      console.warn(err)
    })
  
  }, [])  



  return (
    <div>
      <h1>Hallooo tady impulsovi</h1>
    </div>
  )
}


export const QuizWidget = ({baseURL, dict }) => {
  console.log(baseURL, dict)

  const [recentWordsID, setRecentWordsID] = useState([]);

  const [styleOne, setStyleOne] = useState('');
  const [styleTwo, setStyleTwo] = useState('');
  const [styleThree, setStyleThree] = useState('');
  const [styleFour, setStyleFour] = useState('');

  const [started, setStarted] = useState(false);
  
  const [answers, setAnswers] = useState([]);
  const [correctID, setCorrectID] = useState(99);

  const [isNextShown, setIsNextShown] = useState(false);

  const [picURL, setpicURL] = useState('')
  

  function fetchObj (id) {
    // Console logs -- just to know that it's working - klidně PakVymaz
    console.info('Fetching...')
    console.log("Fetchong for id:" + id)
    
    //Fetching -- phase01
   fetch(baseURL + toString(id))

   //Fetching -phase02
   .then(response => response.text())

   // Fetching - phase03
   .then(data => {
     // Parse the recieved data --> from string to object
     data = JSON.parse(data)
     console.log(data)

     var picURL = data.url
     var title = data.title

     console.info(title)
     console.info(picURL)
       return data
   });
   //return {title:title, url:url}
  }



  // Generate random number
  function genRandomID(keepTrack) {
    var copy = recentWordsID
  
    // Maintain the lenght
    if (recentWordsID.length === 4) {
      copy.shift()
    }
    
    function myIncludes(numero) {
      if (copy.length === 0) {return false}
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] == numero) {return true}        
      }
      return false
    }

    // Generate random number
    let number = undefined
    do {
      number = Math.floor(Math.random() * dict.lenght)
    } while (myIncludes(number.toString()) && keepTrack);

    // Add the number to the KeepTrack array
    if (keepTrack) {
      copy.push(number)
    }


    return number
   }

  function getAnswers(currentID, answerLanguage) {
    let answers = []
    // Generate random answerIDs
    let wrong_answersID = []
    while (wrong_answersID.length < 3) {
      let n = genRandomID(false)
      if (n !== currentID && !(wrong_answersID.includes(n))) {
        wrong_answersID.push(n)
      }
    }

    // Use IDs to create verbal answers
    const  picURL = ''
    let correctID = Math.round(Math.random() * 3);
    setCorrectID(correctID)

    for (let id = 0; id < wrong_answersID.length; id++) {
      let fetchedObj = fetchObj(id)
      answers.push(fetchObj.title)
    }

    let fetchedCorrectObj = fetchObj(currentID)
    answers.splice(correctID, 0, fetchedCorrectObj.title)
    console.log(fetchedCorrectObj.url)
    
    setpicURL(fetchedCorrectObj.url)
    
    setAnswers(answers)
    return {answers:answers, correctID:correctID}
  }

  




    function revealCorrectAnswer (index) {
      setIsNextShown(true)

      if (index !== correctID) {
        switch (index) {
          case 0:
            setStyleOne('wrong');
            break;
          case 1:
            setStyleTwo('wrong');
            break;
          case 2:
            setStyleThree('wrong');
            break;
          case 3:
            setStyleFour('wrong');
            break;  
        }
      }
      switch (correctID) {
        case 0:
          setStyleOne('correct');
          break;
        case 1:
          setStyleTwo('correct');
          break;
        case 2:
          setStyleThree('correct');
          break;
        case 3:
          setStyleFour('correct');
          break;
      }
    }

    function nextQuiestion () {
      setStyleOne('')
      setStyleTwo('')
      setStyleThree('')
      setStyleFour('')

      setIsNextShown(false)


  const CURRENTID = genRandomID(true)
  
  const {answers, correctID, title} = getAnswers(CURRENTID, )

      return {answers:answers, CURRENTID:CURRENTID, correctID:correctID, title:title}

    }


    if (!started) {
      console.log('zacinam hru')
      const  {answers, CURRENTID,  correctID, title} = nextQuiestion();
      setStarted(true)
    } else {
      console.log('aspon neco')
      console.log(recentWordsID)
    }

  return <div className="content content-padding">
      <div className="lesson-card-one-item center bg-green">
        <div style={{backgroundColor: "url(" + picURL + ")" } }  ></div>
      </div>;

      <div className="translate-choices" >
        
        <div className={"choice-card " +styleOne} onClick={() => revealCorrectAnswer(0)}>
          <p className="marker">A)</p>
          <p className="card-title">{answers[0]}</p>
        </div>

        <div className={"choice-card " +styleTwo } onClick={() => revealCorrectAnswer(1)}>
          <p className="marker">B)</p>
          <p className="card-title">{answers[1]}</p>
        </div>

        <div className={"choice-card " +styleThree } onClick={() => revealCorrectAnswer(2)}>
          <p className="marker">C)</p>
          <p className="card-title">{answers[2]}</p>
        </div>

        <div className={"choice-card " + styleFour } onClick={() => revealCorrectAnswer(3)}> 
          <p className="marker">D)</p>
          <p className="card-title">{answers[3]}</p>
        </div>

        
      </div>

    <div className="center-right fine-padding">
      {isNextShown && <div  className={"icon i-arrow-simple-right  "} onClick={() => nextQuiestion()} ></div>}
    </div>
  </div>;
};





export const InvalidDictWidget = ({id}) => {
  return <div className="content content-padding">
    <h2>OOPS...</h2>
    <p>Vypadá to, že tato lekce nemá dostatečný počet slovíček(4)</p>
    <p>Upravit ji můžete<Link to={"/edit/" + id}>Zde</Link></p>

  </div>;
};




export default Quiz;