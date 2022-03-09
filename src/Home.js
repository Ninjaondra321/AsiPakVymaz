import React from 'react';
import TextAnimation from './TextAnimation';
import Filter from './Filter';
import NavBar from './NavBar';
import { NewLessonCard, LessonCard } from './Cards';
import { useState } from 'react';


/*
Tohle mám uložené na porom -- Zatím Nemaž -ale jestli je už zítra, tak klidně jo

fetch("https://raw.githubusercontent.com/Ninjaondra321/pro-biology-sources/master/TestovyClass.txt")
  .then((response) => {
  return response.text();
})
  .then((text) => {
  console.log(text);
});


*/

const Home = () => {
  const [LanguageFilter, setLanguageFilter] = useState('');
  const [NameFilter, setNameFilter] = useState('');

  const [timePodnadpis, setTimePodnadpis] = useState('');

  const PakVymazList = []


  Object.keys(localStorage).forEach(function(key){
    try {
      let xd = localStorage.getItem(key)
      PakVymazList.push(JSON.parse(xd))
      //PakVymazList.push(JSON.stringify(xd))
      
    } catch (error) {
      console.log('nelze jsonifikovat')
    }
  });

  
    function filterFunction (xx) {
      return (
        !!xx.id 
            &&
        xx.rocnik.includes(LanguageFilter) 
            && 
        xx.title.toLowerCase().includes(NameFilter.toLowerCase()))
    }


    function getTimee () {
      var time = new Date()
      var hours = time.getHours()
      console.log(time.getHours())

      let r =  Math.random()
      console.info(r)
      if (r < 0.15) {
        console.log('Nastavuju zdar jak svina')
        setTimePodnadpis('Zdar jak sviňa')
        return 
      }



      if (0 < hours < 10) {
        setTimePodnadpis('Dobré ráno')

      } else if (11 < hours < 15) {
        setTimePodnadpis('Ahoj')

      } else if (16 < hours < 25) {
        setTimePodnadpis('Dobrý večer')
      }



    }

    if (timePodnadpis == '') {
      getTimee()
    }


    const radromZRybizu = Math.random()

  return <>
    <NavBar L_txt="PSProject" R_icon="settings" R_link="/settings" L_link=""/> 
    <div className="content ">
      {radromZRybizu < 0.1 && <h1>Baba z rybízu</h1>}
      {radromZRybizu > 0.1 && <h1>ProBiology</h1>}

      <h3 className='no-padding-top'>{timePodnadpis}</h3>
      


        <div className="filter">
          <div className="center">
          <input type="text" value={NameFilter} onChange={(e) => setNameFilter(e.target.value)}/>
          <div className="icon i-magnifiingglass icon-small"></div>
          </div>
        <div className='language-selection center'>
            <input label="1.Roč" type="radio" id="1.Roč"  name='LANGUAGE' value="1.Roč"   checked={LanguageFilter === "1.Roč" } onChange={(e) => setLanguageFilter(e.target.value)}/>
            <input label="2.Roč" type="radio" id="2.Roč"  name='LANGUAGE' value="2.Roč"  checked={LanguageFilter === "2.Roč" } onChange={(e) => setLanguageFilter(e.target.value)} />
            <input label="3.Roč" type="radio" id="3.Roč"  name='LANGUAGE' value="3.Roč"  checked={LanguageFilter === "3.Roč"} onChange={(e) => setLanguageFilter(e.target.value)} />
            <input label="4.Roč" type="radio" id="4.Roč"  name='LANGUAGE' value="4.Roč"  checked={LanguageFilter === "4.Roč"} onChange={(e) => setLanguageFilter(e.target.value)} />
          </div>


          
          
        </div>
      <div className="content-padding">





        {PakVymazList.filter(filterFunction).map((obj, index) => (<LessonCard  id={obj.id} title={obj.title} language={obj.rocnik}  />))}



        <NewLessonCard/>
      </div>

    </div>
    
  </>;
};

export default Home;
