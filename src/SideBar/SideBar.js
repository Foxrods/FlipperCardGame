import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'

import PlayerCard from '../PlayerCard/PlayerCard';
import './SideBar.css';

function SideBar(props){
    return(
        <div className="SideBar">
            <div className="SideBarItens">
                <div className="card">
                    <PlayerCard image={m1} Playername="Rodolfão" Faz={props.Faz}></PlayerCard>
                    <PlayerCard image={m2} Playername="Malvo" ></PlayerCard>
                </div>
                
                <div>
                    <PlayerCard image={m3} Playername="Moisés" ></PlayerCard>
                    <PlayerCard image={m4} Playername="Do Carmo" ></PlayerCard>
                </div>

            </div>
            
        </div>
    );
}

export default SideBar;