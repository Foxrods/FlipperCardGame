import PlayerCard from '../PlayerCard/PlayerCard';
import './SideBar.css';

function SideBar(){
    return(
        <div className="SideBar">
            <div className="SideBarLogo">
                FLIPPER
            </div>
            <div className="SideCardItem">
                <PlayerCard Playername="Rodolfão"></PlayerCard>
                <PlayerCard Playername="Malvo"></PlayerCard>
            </div>
            
            <div className="SideCardItem">
                <PlayerCard Playername="Moisés"></PlayerCard>
                <PlayerCard Playername="Do Carmo"></PlayerCard>
            </div>
            
        </div>
    );
}

export default SideBar;