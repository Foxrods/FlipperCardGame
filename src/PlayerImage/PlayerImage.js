import "./PlayerImage.css"

function PlayerImage(props){
    return(
        <div>
            <img src={props.image} className="Image" alt="playerImage" />
        </div>
    );
}
export default PlayerImage;