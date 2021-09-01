import "./PlayerTag.css"
import PlayerImage from "../PlayerImage/PlayerImage";

function PlayerTag(){
    return(
        <div className="Player-tag">
            <PlayerImage>
            </PlayerImage>
            <input placeholder="Player Name">
            </input>
        </div>
    );
}
export default PlayerTag;