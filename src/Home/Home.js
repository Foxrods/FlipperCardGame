import logo from '../assets/cards/Clovers_A_white.png';
import logo2 from '../assets/cards/Hearts_King_white.png';
import logo3 from '../assets/cards/Tiles_7_white.png';
import logo4 from '../assets/cards/Pikes_4_white.png';
import logo5 from '../assets/cards/Clovers_3_white.png';
import logo6 from '../assets/cards/Hearts_Queen_white.png';
import logo7 from '../assets/cards/Tiles_6_white.png';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Home.css';

function randomNumberAsString(){
    let rand = Math.floor(Math.random() * 999999);
    return rand.toString().padStart(6, "0");
}

function Home() {
  let mesaNumber = randomNumberAsString();
  
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
                    <Button variant="contained" component={Link} to={`/mesa/${mesaNumber}`} size="large">
                        CRIAR SALA
                    </Button>
                </p>

                <p className="App-text-2">
                    Ou entre com o código de uma sala
                </p>
                <input id="mesaInput" type="text" maxLength="6" className="App-input">
                </input>
            </div>
        </header>
    </div>
  );
}

export default Home;
