import logo from '../assets/cards/Clovers_A_white.png';
import logo2 from '../assets/cards/Hearts_King_white.png';
import logo3 from '../assets/cards/Tiles_7_white.png';
import logo4 from '../assets/cards/Pikes_4_white.png';
import logo5 from '../assets/cards/Clovers_3_white.png';
import logo6 from '../assets/cards/Hearts_Queen_white.png';
import logo7 from '../assets/cards/Tiles_6_white.png';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Session from '../Session/Session';
import SessionService from '../Session/SessionService';
import './Home.css';
import { useState } from 'react';

function randomNumberAsString(){
    let rand = Math.floor(Math.random() * 99999);
    return rand.toString().padStart(5, "0");
}

function Home() {
    const [inputMesaNumber, setinputMesaNumber] = useState('');
    const [redirect, setRedirect] = useState(null);
    
    let mesaNumber = randomNumberAsString();

    async function createSession(){
        var newSession = new Session(mesaNumber);
        await SessionService.createSessionOnFirebase(newSession);
    }

    function keyPress(e){
        setinputMesaNumber(e.target.value);
     }

    function tryToEnterSession(){
        if(inputMesaNumber.length === 5){
            SessionService.getSessionFromFirebase(inputMesaNumber).then( x=> {
                if(x!= null && x.number == inputMesaNumber){
                    setRedirect(`/mesa/${x.number}`);
                }
            });
        }
    }

    function redirectToSession(){
        if(redirect != null)
            return <Redirect to={redirect} />
    }

    
  
  return (
    <div className="App">
        <header className="App-header">
            <div className="App-Container">
                <img src={logo} className="App-logo" alt="logo" />
                <img src={logo2} className="App-logo" alt="logo2" />
                <img src={logo3} className="App-logo" alt="logo3" />
                <img src={logo4} className="App-logo" alt="logo4" />
                <img src={logo5} className="App-logo" alt="logo5" />
                <img src={logo6} className="App-logo" alt="logo6" />
                <img src={logo7} className="App-logo" alt="logo7" />
            </div>
            <div  className="App-Container2">
                <h1 className="App-title">
                    FLIPPER
                </h1>

                <p className="App-text-1">
                    Crie uma sala e comece a jogar agora
                </p>
                
                <p>
                    <Button variant="contained" component={Link} to={`/mesa/${mesaNumber}`} size="large" onClick={() => createSession()}>
                        CRIAR SALA
                    </Button>
                </p>

                <p className="App-text-2">
                    Ou entre com o código de uma sala
                </p>
                <input id="mesaInput" type="text" maxLength="5" className="App-input" onKeyDown={e => keyPress(e)}>
                </input>
                
                {tryToEnterSession()}
                {redirectToSession()}
            </div>
        </header>
    </div>
  );
}

export default Home;
