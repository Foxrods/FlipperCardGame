import './Jogo.css';
import { useParams, Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NumberPicker from '../NumberPicker/NumberPicker';

function Jogo(){
    return (
        <div>
            <SideBar></SideBar>
            <NumberPicker></NumberPicker>
        </div>
    );
}

export default Jogo;