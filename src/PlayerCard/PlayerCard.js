import PlayerImage from '../PlayerImage/PlayerImage';
import './PlayerCard.css';


function PlayerCard(props){
    return(
        <div className="PlayerCard">
            <div className="PlayerCardName">
                {props.Playername}
            </div>
            <PlayerImage image={props.image}></PlayerImage>
            <div className="PlayerCardLine">
                <div className="PlayerStatus">
                    Vida: {props.Vida}
                </div>
                <div className="PlayerStatus">
                    Faz: {props.Faz}
                </div>
                <div className="PlayerStatus">
                    Fez: {props.Fez}
                </div>
            </div>
        </div>
    );
}

export default PlayerCard
