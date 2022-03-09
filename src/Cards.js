import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export const LessonCard = ({id, title, language}) => {
  if (title === "") {title = "Untilteled"}
  return <div className="lesson-card bg-green" >
      <Link to={"/edit/" + id} New="false">
        <div className="icon icon-small i-three-dots"></div>
        </Link>
      <p className="card-title">{title}</p>
      <p className="card-content">{language}</p>
        <Link to={"/quiz/" + id}>
          <div className="i-play-bg"></div>
            <div className="icon icon-medium i-play"></div>
        </Link>
  </div>;
};



export const NewLessonCard = () => {

    // Generate id
    console.log('Generating an ID for this lesson')
    let i = 0
    while (true) {
      i++;
      if (!(i in localStorage)) {
        break
      }
    }

  return <Link to={"/edit/" + i} New='false'>
  <div className="lesson-card-one-item center bg-green">
      <div className="icon icon-large i-plus"></div>
  </div>
  </Link>
};



export const LanguageTitleCard = ({title, changeFunction}) => {
  return <div className="lesson-card-one-item center bg-green">
  <input type="text" value={title} onChange={(e) => changeFunction(e.target.value)}/>
</div>;
};


export const LanguageOneTxt = ({title}) => {
  return <div className="lesson-card-one-item center bg-green">
  <h2>{title}</h2>
</div>;
};



export const EditWordCard = ({obj, deleteSlovicko, afterEditing}) => { 
  const [WordCzech, setWordCzech] = useState(obj.WordCzech);
  const [WordOther, setWordOther] = useState(obj.WordOther);

  const translateID = obj.id

  return <div key={translateID} className="EditTranslateCard">
      <input type="text" value={WordCzech} onChange={(e) => setWordCzech(e.target.value)} onBlur={() => afterEditing(translateID, WordCzech, WordOther)}   />
      <input type="text" value={WordOther}  onChange={(e) => setWordOther(e.target.value)}  onBlur={() => afterEditing(translateID, WordCzech, WordOther)}   />
      <button className="icon i-trash c-pointer" onClick={() => deleteSlovicko()}></button>

  </div>;
};









export const PractiseCard = ({title, translation, isRevealed} ) => {
  const [subtitleClassName, setSubtitleClassName] = useState('hidden')
  if (isRevealed && subtitleClassName !== '') {setSubtitleClassName('')}
  if (!isRevealed && subtitleClassName !== 'hidden') {setSubtitleClassName('hidden')}
  return <div className="PractiseCard ">
    <p className="card-title center">{title}</p>
    <p className={"card-subtitle center " + subtitleClassName}>{translation}</p>
  </div>;
};
