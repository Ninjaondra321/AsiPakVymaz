import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { PractiseCard } from './Cards';

export const PractiseCards = () => {
    const [Nadpis, setNadpis] = useState('Není nastaveno');
    const [Podnadpis, setPodnadpis] = useState('Není nastaveno');
   const [isRevealedAnswer, setIsRevealedAnswer] = useState(false);
    const [isSetted, setIsSetted] = useState(false);
    const [ListOfPreviousQuiestionIDs, setListOfPreviousQuiestionIDs] = useState([]);

    // A bit of experiment here
    const [StringOfPreviousIDs, setStringOfPreviousIDs] = useState('');

    console.log('Ahoj - Practise Cards')

    let {id} = useParams()
    let obj = JSON.parse(localStorage.getItem(id))
    let dict = obj.dict

    function generateNextSet () {
        console.log('Ahoj - generate next set')
        console.log(dict)
        console.log(dict.length)
        do {
            var idd  = Math.floor(Math.random() * dict.length)
            console.log(idd)
        }  while (StringOfPreviousIDs.includes('-' + idd))

        setStringOfPreviousIDs('' + StringOfPreviousIDs + '-' + idd )



        if (StringOfPreviousIDs.split('-').length  == dict.length - 1) {
            setStringOfPreviousIDs(StringOfPreviousIDs)
            // generate new string
            let finalString = ''
            for (let i = 2; i < StringOfPreviousIDs.length - 2; i++) {
                const element = StringOfPreviousIDs[i];
                finalString += element
            }
            setStringOfPreviousIDs(finalString)
        }


        if (Math.random() > 0.5) {
            setNadpis(dict[idd].WordCzech)
            setPodnadpis(dict[idd].WordOther)
        } else {
            setNadpis(dict[idd].WordOther)
            setPodnadpis(dict[idd].WordCzech)
        }


        setIsRevealedAnswer(false)
        console.warn(StringOfPreviousIDs)

    }

    function revealAnswer () {
        console.log('Ahoj - reveal answer')
        setIsRevealedAnswer(true)
    }

    if (!isSetted) {
        generateNextSet()
        setIsSetted(true)
    }

    console.info(isRevealedAnswer)
  return <div className="content content-padding">
      <NavBar L_icon='arrow-simple-left' L_link='/' R_icon='form' M_txt={obj.title} R_link={'/quiz/' + id} />

        <PractiseCard title={Nadpis} translation={Podnadpis} isRevealed={isRevealedAnswer} />

        <div className="center-right fine-padding">
        {!isRevealedAnswer && <div className="icon i-turn-card" onClick={() => setIsRevealedAnswer(true)}></div>}
        {isRevealedAnswer && <div className="icon i-arrow-simple-right" onClick={() => generateNextSet()}></div>}
        </div>
      </div>
};
