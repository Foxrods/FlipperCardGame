import "./PlayerTag.css"
import PlayerImage from "../PlayerImage/PlayerImage";
import SessionService from '../Session/SessionService';
import { useState } from 'react';


function PlayerTag(props){
    const [playerName, setplayerName] = useState(props.playerName !== undefined ? props.playerName : '');

    return(
        <div className="Player-tag">
            <PlayerImage image={props.image}>
            </PlayerImage>
            <input
                className="InputPlayerName" 
                placeholder="" 
                value={playerName}
                disabled={true}
                onInput={e => setplayerName(e.target.value)}>
            </input>
        </div>
    );
}
export default PlayerTag;