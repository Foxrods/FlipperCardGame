import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'

import PlayerCard from '../PlayerCard/PlayerCard';
import PlayerSessionService from '../Session/PlayerSessionService';
import { useState } from 'react';
import './SideBar.css';

function SideBar(props){
    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const images = [m1,m2,m3,m4];

    function loadPlayers(){
        if(!synced){
            PlayerSessionService.getPlayersInsideSession(props.mesaNumber, (players) => {
                setSynced(true);
                setPlayers(players);
            });
        }
    }

    function getNthPlayer(index){
        if(players !== undefined && players.length > index){
            return (<PlayerCard 
                image={images[index]} 
                Playername={players[index].playerName} 
                Vida={players[index].vida} 
                Faz={players[index].faz}
                Fez={players[index].fez}>
            </PlayerCard>);
        }
    }

    return(
        <div className="SideBar">
            <div className="SideBarItens">
                <div className="card">
                    {getNthPlayer(0)}
                    {getNthPlayer(1)}
                </div>
                <div>
                    {getNthPlayer(2)}
                    {getNthPlayer(3)}
                </div>
            </div>
            {loadPlayers()}
        </div>
    );
}

export default SideBar;