import './Jogo.css';
import { useParams, Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState } from 'react';

function Jogo(){
    //state vars and callbacks
    const [cardQtd, setCardQtd] = useState(0);
    let handleNumberChose = e => setCardQtd(e);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(true);
    let handleQtdCartasModalOpen = e => setQtdCartasModalOpen(e);


    return (
        <div>
            <button onClick={() => setQtdCartasModalOpen(true)}>Abrir modal</button>
            <SideBar></SideBar>
            <NumberModal 
                title="Quantas cartas?" 
                number = {cardQtd}
                handleNumberChose = {handleNumberChose}
                open = {isQtdCartasModalOpen}
                handleModalOpen = {handleQtdCartasModalOpen}>
            </NumberModal>
        </div>
    );
}

export default Jogo;