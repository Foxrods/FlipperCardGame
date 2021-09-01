import PlayerImage from '../PlayerImage/PlayerImage';
import './PlayerCard.css';


function PlayerCard(props){
    let faz = 0;
    let fez = 0;
    let vida = 3;
    return(
        <div className="PlayerCard">
            <div className="PlayerCardName">
                {props.Playername}
            </div>
            <PlayerImage></PlayerImage>
            <div className="PlayerCardLine">
                <div className="PlayerStatus">
                    Vida: {vida}
                </div>
                <div className="PlayerStatus">
                    Faz: {faz}
                </div>
                <div className="PlayerStatus">
                    Fez: {fez}
                </div>
            </div>
        </div>
    );
}

export default PlayerCard
