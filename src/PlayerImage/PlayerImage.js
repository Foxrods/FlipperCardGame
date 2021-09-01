import "./PlayerImage.css"
import playerPNG from '../assets/Player.png';

function PlayerImage(){
    return(
        <div>
            <img src={playerPNG} className="Image" alt="playerImage" />
        </div>
    );
}
export default PlayerImage;