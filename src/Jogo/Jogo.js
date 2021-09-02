import './Jogo.css';
import { useParams, Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';

function Jogo(){
    return (
        <div>
            <SideBar></SideBar>
            <NumberModal title="Quantas cartas?"></NumberModal>
        </div>
    );
}

export default Jogo;