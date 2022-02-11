import './Jogo.css';
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState, useEffect  } from 'react';
import GameManager from '../GameManager/GameManager';

function Jogo(){
    //state vars and callbacks
    const [deck, setDeck] = useState(GameManager.getDeckList());
    const [hand, setHand] = useState([]);

    const [cardQtd, setCardQtd] = useState(1);
    let handleNumberChose = e => setCardQtd(e);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(true);
    let handleQtdCartasModalOpen = e => ExhibitCard(e);

    const [qtdFaz, setQtdFaz] = useState(0);
    let handleQtdFazChose = e => setQtdFaz(e);

    const [isQtdFazModalOpen, setQtdFazModalOpen] = useState(false);
    let handleQtdFazModalOpen = e => setQtdFazModalOpen(e);

    const [playedCard, setPlayedCard] = useState(<div></div>)

    const [isPlayerTurn, setPlayerTurn] = useState(true); //fazer jogadores ser um objeto numa lista. Eles terao o atributo de ser turno deles ou nao

    function GiveHand(){
        let divHand = [];
        if(!isQtdCartasModalOpen){
            for(let i = 0; i < cardQtd; i++){
                divHand.push(<div key={i-1} className="CardInHand" onClick={e => PlayChosenCard(hand[i])}>{hand[i]}</div>)
            }
        }
        return divHand; 
    }

    function ChooseQtdFazState(){
        setQtdFazModalOpen(true);
    }

    function ExhibitCard(modalOpen){

        setQtdCartasModalOpen(modalOpen);
        ChooseQtdFazState();

        let cartas = [];
        for (let i = 1; i <= cardQtd; i++) {
            cartas.push(deck[i-1]);
            //deck.remove(i);
        }
        setHand(cartas);
    }

    function ExhibitManilha(){
        if(!isQtdCartasModalOpen){
            return deck[39];
        }
    }

    function PlayChosenCard(card){
        if(!isQtdCartasModalOpen && !isQtdFazModalOpen && isPlayerTurn){
            if(hand.indexOf(card) !== -1){
                hand.splice(hand.indexOf(card),1);
                setPlayedCard(<div className="PlayedCards">{card}</div>)
            }
            setHand(hand);
            skipTurn();
            //setTimeout(skipTurn, 3000);
        }
    }

    function skipTurn(){
        setPlayerTurn(false);
        //setPlayedCard(<div></div>);
    }

    return (
        <div className="Jogo">
            <SideBar Faz={qtdFaz}></SideBar>
            <div className="JogoBoard">
                <button onClick={() => setQtdFazModalOpen(true)}>Quantas Faz?</button>
                <div className="Manilha">
                    {ExhibitManilha()}
                </div>
                <div className="PlayedCardsContainer">
                    {playedCard}
                    
                    {/* <div className="PlayedCards2">
                        {PlayChosenCard(hand[37])}
                    </div>
                    <div className="PlayedCards3">
                        {PlayChosenCard(hand[36])}
                    </div>
                    <div className="PlayedCards4">
                        {PlayChosenCard(hand[35])}
                    </div> */}
                </div>
                <div className="Hand">
                    {GiveHand()}
                </div>
            </div>
            <NumberModal 
                title="Quantas cartas?" 
                number = {cardQtd}
                handleNumberChose = {handleNumberChose}
                open = {isQtdCartasModalOpen}
                handleModalOpen = {handleQtdCartasModalOpen}
                max = {8}
                min = {1}
                key = "modal-qtd-cartas">
            </NumberModal>

            <NumberModal 
                title="Quantas faz?" 
                number = {qtdFaz}
                handleNumberChose = {handleQtdFazChose}
                open = {isQtdFazModalOpen}
                handleModalOpen = {handleQtdFazModalOpen}
                max = {10}
                min = {0}
                key = "modal-faz">
            </NumberModal>
        </div>
    );
}

export default Jogo;