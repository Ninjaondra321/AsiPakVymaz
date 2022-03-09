import React from 'react';
import NavBar from './NavBar';
import { useState } from 'react';



 const  Settings = ({Theme, ThemeStyle, ThemeColor, changeFunction}) => {


  function deleteAllLocalStorage() {
    localStorage.clear()
  }


  function handleExtentionOutput(that) {
    console.log('HALOOOOOOOOOOOo')
    console.log(that)

    // 2:"{"title":"ProKarla","id":"2","language":"AJ","dict":[{"WordCzech":"Duch","WordOther":"Ghost","id":1},{"WordCzech":"Duše","WordOther":"Soul","id":2},{"WordCzech":"Vězení","WordOther":"Jail","id":3},{"WordCzech":"Tisk","WordOther":"Press","id":4}]}"

    if (that.toLowerCase() === "karel") {
      localStorage.setItem(1000, JSON.stringify({"title":"ProKarla","id":"1000","language":"AJ","dict":[{"WordCzech":"Duch","WordOther":"Ghost","id":1},{"WordCzech":"Duše","WordOther":"Soul","id":2},{"WordCzech":"Vězení","WordOther":"Jail","id":3},{"WordCzech":"Tisk","WordOther":"Press","id":4}]}))
      
    }}




    function testNotification () {

      if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          var options = {
            body: 'Here is a notification body!',
            
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            },
            actions: [
              {action: 'explore', title: 'Explore this new world',
                icon: 'images/checkmark.png'},
              {action: 'close', title: 'Close notification',
                icon: 'images/xmark.png'},
            ]
          };
          reg.showNotification('Hello world!', options);
        });
      }
      
    }

  return <>
    <NavBar L_txt="Nastavení" R_icon="home" R_link="/" L_link=""/>
    
    <div className="content content-padding">
        <h1>Theme</h1>
          <h3>Theme accent</h3>
            <div className="language-selection center ">
              <input label="Light" type="radio" id="Light" name='THEME' value='Light'  checked={Theme === 'light'}    onChange={() => changeFunction('THEME', 'light')}/>
              <input label="Dark" type="radio" id="Dark" name='THEME' value='Dark' checked={Theme === 'dark'}  onChange={() => changeFunction('THEME', 'dark')}/>
              <input label="System" type="radio" id="System" name='THEME' value='System' checked={Theme === 'system' }  onChange={() => changeFunction('THEME', 'system')}/>
            </div>

            <h3>Theme style</h3>
            <div className="language-selection center ">
              <input label="Gradient" type="radio" id="Gradien" name='STYLE' value='Gradient' onChange={() => changeFunction('STYLE', 'gradient')}  checked={ThemeStyle === 'gradient'}/>
              <input label="Aurora" type="radio" id="Aurora" name='STYLE' value='Aurora'  onChange={() => changeFunction('STYLE', 'aurora')} checked={ThemeStyle === 'aurora'}/>
            </div>

            <h3>Theme color</h3>
            <div className="language-selection center ">
              <input label="Color01" type="radio" id="Color01" name='COLOR' value='Color01'   onChange={() => changeFunction('COLOR', 'color01')}  checked={ThemeColor === 'color01'}/>
              <input label="Color02" type="radio" id="Color02" name='COLOR' value='Color02'  onChange={() => changeFunction('COLOR', 'color02')}  checked={ThemeColor === 'color02'}/>
            </div>


        <h1>Rozšíření</h1>
          <p>Napište unikátní kód rozšíření</p>
          <input id="extention_input"  type="search" onBlur={(e) => handleExtentionOutput(e.target.value)}/>

        <h1>Data</h1>
            <h3>Cookies</h3>
                <p>Tato aplikace nepoužívá žádné cookies, pouze ServiceWorkers a včechna data ukládá do LocalStorage</p>

            <button className='w-100'  onClick={() => deleteAllLocalStorage()}>Vymazat všechna data uložená v LocalStorage</button>


        <div className='fine-padding'>
        </div>

        <button className='w-100 ' onClick={() => testNotification()}>Na tohle neklikej, nebo vybuchne atomovka a zničí celou planetu Zemi. Takže na to prostě neklikej. Tečka.</button>

    </div>
  </>;
};


export default Settings;
