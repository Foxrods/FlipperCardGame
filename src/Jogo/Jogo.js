import './Jogo.css';
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState, useEffect  } from 'react';
import { useParams } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import PlayerSessionService from '../Session/PlayerSessionService';
import JogoService from './JogoService';
import Deck from '../Deck/Deck'

function Jogo(){
    
    let { mesaNumber } = useParams();
    const [deckSeed, setDeckSeed] = useState(mesaNumber);
    let thisPlayerPosition = 0;
    let thisPlayer = null;
    const [jogo, setJogo] = useState();
    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const [deck, setDeck] = useState(Deck.getDeckList(deckSeed));
    const [hand, setHand] = useState([]);
    const [totalCardsPlayed, setTotalCardsPlayed] = useState(0);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(false);
    let handleQtdCartasModalOpen = (closeModal, chosenNumber) => {
        let innerJogo = jogo;
        innerJogo.cardQtdInThisTurn = chosenNumber;
        setJogo(innerJogo);
        JogoService.updateJogo(jogo);
        ExhibitCard(closeModal, chosenNumber);
        if(!closeModal) setQtdFazModalOpen(true);
    }

    const [isQtdFazModalOpen, setQtdFazModalOpen] = useState(false);
    let handleQtdFazModalOpen = (closeModal, chosenNumber) => {
        let innerPlayer = players.find(x => x.playerName === localStorage.getItem('PlayerName'));
        innerPlayer.faz = chosenNumber;
        innerPlayer.isReady = true;
        PlayerSessionService.updatePlayerSession(innerPlayer);
        setQtdFazModalOpen(closeModal);
    }

    useEffect(() => {
        loadJogo();
        loadPlayers();
        return () => {
            // this is cleanup function, will call just on component will unmount
            // you can clear your events listeners or any async calls here
        }
    }, [])

    function loadPlayers(){
        if(!synced){
            PlayerSessionService.getPlayersInsideSession(mesaNumber, (players) => {
                thisPlayer = players.find(x => x.playerName === localStorage.getItem('PlayerName'));
                thisPlayerPosition = players.indexOf(thisPlayer);
                setPlayers(players);
                setQtdCartasModalOpen(thisPlayer.isCurrentPlayer && !thisPlayer.isReady);
                setQtdFazModalOpen(!thisPlayer.isCurrentPlayer && !thisPlayer.isReady);
                setSynced(true);
            });
        }
    }

    function loadJogo(){
        JogoService.getJogoSnapshotFromFirebase(mesaNumber, (jogo) => {
            setJogo(jogo);
            if(jogo.cardQtdInThisTurn > 0 && !(jogo.cardsInTable[0])){
                ExhibitCard(false, jogo.cardQtdInThisTurn);
            }
        });
        
    }
    
    function GiveHand(){
        let divHand = [];
        if(!isQtdCartasModalOpen && hand.length > 0){
            for(let i = 0; i < hand.length; i++){
                divHand.push(<div key={i-1} className="CardInHand" onClick={e => PlayChosenCard(hand[i])}>{hand[i]}</div>)
            }
        }
        return divHand; 
    }

    function ExhibitCard(modalOpen, qtd){
        setQtdCartasModalOpen(modalOpen);
        let cartas = [];
        for (let i = thisPlayerPosition * qtd; i < thisPlayerPosition * qtd + qtd; i++) {
            cartas.push(deck[i]);
        }
        setHand(cartas);
    }

    function ExhibitManilha(){
        if(deck[38]){
            return deck[38];
        }
    }

    function PlayChosenCard(card){
        if(!isQtdCartasModalOpen && !isQtdFazModalOpen){
            if(hand.indexOf(card) !== -1){
                hand.splice(hand.indexOf(card),1);
                updateCardsInTable(card);
            }
            setHand(hand);
            setTotalCardsPlayed(totalCardsPlayed + 1);
            console.log(totalCardsPlayed)
        }
    }

    function updateCardsInTable(card){
        let strCard = ReactDOMServer.renderToStaticMarkup(card);
        let innerJogo = jogo;
        innerJogo.cardsInTable.push(strCard);
        JogoService.updateJogo(innerJogo);
    }

    function getPlayedCard1(){
        if(jogo?.cardsInTable[0])
            return <div className="PlayedCards" dangerouslySetInnerHTML={{__html: jogo.cardsInTable[0]}}></div>
    }

    function getPlayedCard2(){
        if(jogo?.cardsInTable[1])
            return <div className="PlayedCards2" dangerouslySetInnerHTML={{__html: jogo.cardsInTable[1]}}></div>
    }

    function getPlayedCard3(){
        if(jogo?.cardsInTable[2])
            return <div className="PlayedCards3" dangerouslySetInnerHTML={{__html: jogo.cardsInTable[2]}}></div>
    }

    function getPlayedCard4(){
        if(jogo?.cardsInTable[3])
            return <div className="PlayedCards4" dangerouslySetInnerHTML={{__html: jogo.cardsInTable[3]}}></div>
    }

    return (
        <div className="Jogo">
            <SideBar players={players}></SideBar>
            <div className="JogoBoard">
                <div className="Manilha">
                    {ExhibitManilha()}
                </div>
                <div className="PlayedCardsContainer">
                    {getPlayedCard1()}
                    {getPlayedCard2()}
                    {getPlayedCard3()}
                    {getPlayedCard4()}
                </div>
                <div className="Hand">
                    {GiveHand()}
                </div>
            </div>
            <NumberModal 
                title="Quantas cartas?" 
                open = {isQtdCartasModalOpen}
                handleModalOpen = {handleQtdCartasModalOpen}
                max = {8}
                min = {1}
                key = "modal-qtd-cartas">
            </NumberModal>

            <NumberModal 
                title="Quantas faz?" 
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