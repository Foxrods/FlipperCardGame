import { getThemeProps } from '@material-ui/styles';
import PlayerCard from '../PlayerCard/PlayerCard';
import './SideBar.css';

function SideBar(props){
    return(
        <div className="SideBar">
            <div className="SideBarItens">
                <div className="SideBarLogo">
                    FLIPPER
                </div>
                <div className="SideCardItem">
                    <PlayerCard Playername="Rodolfão" Faz={props.Faz}></PlayerCard>
                    <PlayerCard Playername="Malvo" ></PlayerCard>
                </div>
                
                <div className="SideCardItem">
                    <PlayerCard Playername="Moisés" ></PlayerCard>
                    <PlayerCard Playername="Do Carmo" ></PlayerCard>
                </div>

            </div>
            
        </div>
    );
}

export default SideBar;