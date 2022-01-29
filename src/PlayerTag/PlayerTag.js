import "./PlayerTag.css"
import PlayerImage from "../PlayerImage/PlayerImage";
import SessionService from '../Session/SessionService';
import { useState } from 'react';


function PlayerTag(props){
    const [playerName, setplayerName] = useState(props.playerName !== undefined ? props.playerName : '');
    const [buttonDeactivated, setbuttonDeactivated] = useState(props.playerName !== undefined ? true: false);

    function addPlayerAndDeactivateButton(){
        setbuttonDeactivated(true);
        SessionService.addPlayerToSessionOnFirebase(props.mesaNumber, playerName)
    }

    return(
        <div className="Player-tag">
            <PlayerImage>
            </PlayerImage>
            <input placeholder="Player Name" 
                value={playerName}
                disabled={buttonDeactivated}
                onInput={e => setplayerName(e.target.value)}>
            </input>
            <button hidden={buttonDeactivated} onClick={() => addPlayerAndDeactivateButton()}>
                Adicionar
            </button>
        </div>
    );
}
export default PlayerTag;