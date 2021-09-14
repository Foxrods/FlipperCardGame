import './Jogo.css';
import { useParams, Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState } from 'react';
import Deck from '../Deck/Deck'

let deck = Deck.getDeckList();

function Jogo(){
    //state vars and callbacks
    const [cardQtd, setCardQtd] = useState(1);
    let handleNumberChose = e => setCardQtd(e);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(true);
    let handleQtdCartasModalOpen = e => setQtdCartasModalOpen(e);

    function ExhibitCard(){
        let cartas = [];
        for (let i = 1; i <= cardQtd; i++) {
            cartas.push(<div className="CardInHand"> {deck[i-1]} </div>);
            //deck.remove(i);
        }
        if(!isQtdCartasModalOpen)
            return cartas;
    }

    function ExhibitManilha(){
        if(!isQtdCartasModalOpen)
            return deck[39];
    }

    function PlayChosenCard(cardNumber){
        if(!isQtdCartasModalOpen)
            return deck[cardNumber];
    }

    return (
        <div className="Jogo">
            <SideBar></SideBar>
            <div className="JogoBoard">
                <div className="Manilha">
                    {ExhibitManilha()}
                </div>
                <div className="PlayedCardsContainer">

                    <div className="PlayedCards">
                        {PlayChosenCard(38)}
                    </div>
                    <div className="PlayedCards2">
                        {PlayChosenCard(37)}
                    </div>
                    <div className="PlayedCards3">
                        {PlayChosenCard(36)}
                    </div>
                    <div className="PlayedCards4">
                        {PlayChosenCard(35)}
                    </div>
                </div>
                <div className="Hand">
                    {ExhibitCard()}
                </div>
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