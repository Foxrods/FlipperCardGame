import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'

import PlayerCard from '../PlayerCard/PlayerCard';
import './SideBar.css';

function SideBar(props){
    let players = props.players;
    const images = [m1,m2,m3,m4];

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
        </div>
    );
}

export default SideBar;