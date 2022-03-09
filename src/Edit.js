import React, { useState } from 'react';
import { useParams } from 'react-router';
import NavBar from './NavBar';
import { LanguageTitleCard } from './Cards';
import {useNavigate} from 'react-router-dom'
import { EditWordCard } from './Cards';



// TOHLE JE MOJE -- NEMAZ!!!!!

const Edit = ({New}) => {
  

    let {id} = useParams()

    let navigate = useNavigate()

    const [isSetted, setIsSetted] = useState(false);
    const [Title, setTitle] = useState('');
    const [listURL, setListURL] = useState('');
    const [WordCzech, setWordCzech] = useState('');
    const [WordOther, setWordOther] = useState('');
    const [myDict, setMyDict] = useState([]);
    const [Rocnik, setRocnik] = useState("")
    

    const listOfVariables = []


   if (localStorage.getItem(id) === null) {
     console.log('Je nové')
   } else if (!isSetted) {
     console.log('Není nové')

     let LocStrObj = JSON.parse(localStorage.getItem(id))
     if (LocStrObj.title != Title) {setTitle(LocStrObj.title)}
     if (LocStrObj.dict != myDict) {setMyDict(LocStrObj.dict)}
     if (LocStrObj.listURL != listOfVariables) {setListURL(LocStrObj.listURL)}
     if (LocStrObj.rocnik  != Rocnik ) {setRocnik(LocStrObj.rocnik)}
     
     setIsSetted(true)
   }
    
    function Save() {
        localStorage.setItem(id, JSON.stringify({title: Title, id:id, listURL: listURL, rocnik:Rocnik}))
        console.log()
        setMyDict(JSON.parse(localStorage.getItem(id)).dict)
    }

      
  return <div className="content">

      <NavBar M_txt={New ? "Edit " + id : 'Add new' } L_icon="arrow-simple-left" R_icon="form" L_link="/" R_link={'/quiz/' + id}/>
      <div className="content-padding">
      
        <LanguageTitleCard title={Title} changeFunction={setTitle} />

        <div className="w-100 center">
        <div className='language-selection center '>
            <input label="1.Roč" type="radio" id="1.Roč" name='LANGUAGE' value="1.Roč" checked={Rocnik ==="1.Roč"} onChange={(e) => setRocnik(e.target.value)}/>
            <input label="2.Roč" type="radio" id="2.Roč" name='LANGUAGE' value="2.Roč" checked={Rocnik ==="2.Roč"} onChange={(e) => setRocnik(e.target.value)} />
            <input label="3.Roč" type="radio" id="3.Roč" name='LANGUAGE' value="3.Roč" checked={Rocnik ==="3.Roč"} onChange={(e) => setRocnik(e.target.value)} />
          </div>
        </div>





        <input type="url" onChange={(e) => setListURL(e.target.value)} value={listURL} />
       

        <button className="bg-green center w-100 one-line-button-padding" onClick={() => Save()}>Save</button>

        <div className="icon"></div>
      </div>
  </div>;
};

export default Edit;





