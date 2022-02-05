import './Home.css';
import logo from '../assets/cards/Clovers_A_white.png';
import logo2 from '../assets/cards/Hearts_King_white.png';
import logo3 from '../assets/cards/Tiles_7_white.png';
import logo4 from '../assets/cards/Pikes_4_white.png';
import logo5 from '../assets/cards/Clovers_3_white.png';
import logo6 from '../assets/cards/Hearts_Queen_white.png';
import logo7 from '../assets/cards/Tiles_6_white.png';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import Session from '../Session/Session';
import SessionService from '../Session/SessionService';
import AlertModal from '../AlertModal/AlertModal';

function randomNumberAsString(){
    let rand = Math.floor(Math.random() * 99999);
    return rand.toString().padStart(5, "0");
}

function Home() {
    const [inputMesaNumber, setinputMesaNumber] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [mesaLotada, setMesaLotada] = useState(false);
    
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
                if(x !== null && x.number === inputMesaNumber && x.players.length < 4){
                    setRedirect(`/mesa/${x.number}`);
                }
                else if(x !== null && x.players.length >= 4){
                    setMesaLotada(true);
                }
            });
        }
    }

    function redirectToSession(){
        if(redirect !== null)
            return <Redirect to={redirect} />
    }

    function closeModalAndEraseInput(){
        setMesaLotada(false);
        setinputMesaNumber('');
    }
  
  return (
    <div className="App">
        <header className="App-header">
            <div className="App-Container">
                <div className="App-title">
                    FLIPPER
                </div>
                <img src={logo} className="App-logo" alt="logo" />
                <img src={logo2} className="App-logo" alt="logo2" />
                <img src={logo3} className="App-logo" alt="logo3" />
                <img src={logo4} className="App-logo" alt="logo4" />
                <img src={logo5} className="App-logo" alt="logo5" />
                <img src={logo6} className="App-logo" alt="logo6" />
                <img src={logo7} className="App-logo" alt="logo7" />
            </div>
            <div  className="App-Container2">

                <p className="App-text-1">
                    Crie uma sala e comece a jogar agora
                </p>
                
                <p>
                    <Button className='App-button' variant="contained" component={Link} to={`/mesa/${mesaNumber}`} size="large" onClick={() => createSession()}>
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
        <AlertModal 
            open={mesaLotada}
            alertText={'Essa mesa está lotada!'}
            buttonAction={() => closeModalAndEraseInput()}>
        </AlertModal>
    </div>
  );
}

export default Home;
