import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'

import PlayerTag from '../PlayerTag/PlayerTag';
import './MesaDeEspera.css';
import { useParams, Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import SessionService from '../Session/SessionService';
import { useState, useEffect } from 'react';
import NameModal from '../NameModal/NameModal';

function MesaDeEspera(){
    let { mesaNumber } = useParams();

    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const [nameModalOpened, setNameModalOpened] = useState(true);
    const [thisPlayerName, setThisPlayerName] = useState("");

    function loadPlayers(){
        if(!synced){
            SessionService.getSessionSnapshotFromFirebase(mesaNumber, (session) => {
                setPlayers(session.players);
                setSynced(true);
            });
        }
    }

    function closeModalAndAddPlayer(){
        if(thisPlayerName !== ""){
            SessionService.addPlayerToSessionOnFirebase(mesaNumber, thisPlayerName);
            setNameModalOpened(false);
        }
    }

    useEffect(() => {
        loadPlayers()
    });

    return (
        <div className="All">
            <NameModal
                open={nameModalOpened}
                name={thisPlayerName}
                setName={name => setThisPlayerName(name)}
                closeModalAndAddPlayer={() => closeModalAndAddPlayer()}
            >
            </NameModal>
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
                <Button className="Mesa-button" variant="contained" component={Link} to={`/jogo/${mesaNumber}`} size="large">
                    Iniciar
                </Button>
            </p>
        </div>
    );
}

export default MesaDeEspera;