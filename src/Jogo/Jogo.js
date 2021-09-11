import './Jogo.css';
import { useParams, Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState } from 'react';
import Deck from '../Deck/Deck'

let deck = Deck.getDeckList();

function Jogo(){
    //state vars and callbacks
    const [cardQtd, setCardQtd] = useState(0);
    let handleNumberChose = e => setCardQtd(e);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(true);
    let handleQtdCartasModalOpen = e => setQtdCartasModalOpen(e);

    function ExhibitCard(){
        let cartas = [];
        for (let i = 1; i <= cardQtd; i++) {
            cartas.push(<div>Carta {deck[i-1]}</div>);
        }
        return cartas;
    }

    return (
        <div className="Jogo">
            <SideBar></SideBar>
            <div className="JogoBoard">
                {ExhibitCard()}
            </div>
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