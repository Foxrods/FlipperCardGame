import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'

import './MesaDeEspera.css';
import DeckService from '../Deck/DeckService';
import NameModal from '../NameModal/NameModal';
import PlayerTag from '../PlayerTag/PlayerTag';
import AlertModal from '../AlertModal/AlertModal';
import SessionService from '../Session/SessionService';
import PlayerSessionService from '../Session/PlayerSessionService';
import JogoService from '../Jogo/JogoService';
import { useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

function MesaDeEspera(){
    let { mesaNumber } = useParams();

    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const [nameModalOpened, setNameModalOpened] = useState(true);
    const [thisPlayerName, setThisPlayerName] = useState("");
    const [redirect, setRedirect] = useState(false);

    function loadPlayers(){
        if(!synced){
            SessionService.getSessionSnapshotFromFirebase(mesaNumber, (session) => {
                setSynced(true);
                setPlayers(session.players);
                setRedirect(session.gameIniciated);
            });
        }
    }

    function closeModalAndAddPlayer(){
        if(thisPlayerName !== ""){
            localStorage.setItem('PlayerName', thisPlayerName);
            SessionService.addPlayerToSessionOnFirebase(mesaNumber, thisPlayerName);
            setNameModalOpened(false);
        }
    }

    function redirectToGameSession(){
        if(checkIfPlayerIsInTableBeforeRedirect())
            return <Redirect to={`/jogo/${mesaNumber}`}></Redirect>
    }

    function returnToHome(){
        return window.location.href='/FlipperCardGame';
    }

    function checkIfPlayerIsInTableBeforeRedirect(){
        return redirect && players.find(x => x === thisPlayerName);
    }

    function InitiateGameSession(){
        players.forEach(player => PlayerSessionService.createNewPlayerSessionForPlayer(mesaNumber, player, isFirstPlayer(player), players.indexOf(player)))
        JogoService.createJogoOnFirebase(mesaNumber)
        setTimeout(() => SessionService.iniciateGameSession(mesaNumber), 2000);
    }

    function isFirstPlayer(playerName){
        return players.findIndex(x => x == playerName) == 0;
    }

    useEffect(() => {
        let mounted = true;
        if(mounted){
            loadPlayers();
        }
        return function cleanup() {
            mounted = false;
        }
    });

    return (
        <div className="All">
            <NameModal
                open={nameModalOpened && !redirect}
                name={thisPlayerName}
                setName={name => setThisPlayerName(name)}
                closeModalAndAddPlayer={() => closeModalAndAddPlayer()}
            >
            </NameModal>
            <AlertModal 
                open={redirect} 
                alertText={'O jogo iniciou sem você...'} 
                buttonAction={() => returnToHome()}>
            </AlertModal>
            <header className="Mesa-header">
                FLIPPER
            </header>
            <h1 className="Mesa-number">
                MESA: {mesaNumber}
            </h1>
            <div className="Mesa">
                <PlayerTag key={players[0]} playerName={players[0]} mesaNumber={mesaNumber} image={m1}></PlayerTag>
                <PlayerTag key={players[1]} playerName={players[1]} mesaNumber={mesaNumber} image={m2}></PlayerTag>
                <PlayerTag key={players[2]} playerName={players[2]} mesaNumber={mesaNumber} image={m3}></PlayerTag>
                <PlayerTag key={players[3]} playerName={players[3]} mesaNumber={mesaNumber} image={m4}></PlayerTag>
                
            </div>
            <p className='Mesa-button-container'>
                <Button className="Mesa-button" variant="contained" size="large" onClick={() => InitiateGameSession()} disabled={players.length < 2}>
                    Iniciar
                </Button>
            </p>

            {loadPlayers()}
            {redirectToGameSession()}
        </div>
    );
}

export default MesaDeEspera;