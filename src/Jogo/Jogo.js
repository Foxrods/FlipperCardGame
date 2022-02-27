import './Jogo.css';
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState, useEffect  } from 'react';
import { useParams } from "react-router-dom";
import DeckService from '../Deck/DeckService';
import PlayerSessionService from '../Session/PlayerSessionService';
import JogoService from './JogoService';
import Deck from '../Deck/Deck'

function Jogo(){
    //state vars and callbacks
    let { mesaNumber } = useParams();
    const [deckSeed, setDeckSeed] = useState(mesaNumber);
    let thisPlayerPosition = 0;
    let thisPlayer = null;
    const [jogo, setJogo] = useState();
    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const [deck, setDeck] = useState(Deck.getDeckList(deckSeed));
    const [hand, setHand] = useState([]);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(false);
    let handleQtdCartasModalOpen = (closeModal, chosenNumber) => {
        let innerJogo = jogo;
        innerJogo.cardQtdInThisTurn = chosenNumber;
        setJogo(innerJogo);
        JogoService.updateJogo(jogo);
        ExhibitCard(closeModal, chosenNumber);
    }

    const [isQtdFazModalOpen, setQtdFazModalOpen] = useState(false);
    let handleQtdFazModalOpen = (closeModal, chosenNumber) => {
        let innerPlayer = players.find(x => x.playerName === localStorage.getItem('PlayerName'));
        innerPlayer.faz = chosenNumber;
        innerPlayer.isReady = true;
        PlayerSessionService.updatePlayerSession(innerPlayer);
        setQtdFazModalOpen(closeModal);
    }

    const [playedCard, setPlayedCard] = useState(<div></div>)

    const [isPlayerTurn, setPlayerTurn] = useState(true); //fazer jogadores ser um objeto numa lista. Eles terao o atributo de ser turno deles ou nao

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
                setSynced(true);
            });
        }
    }

    function loadJogo(){
        JogoService.getJogoSnapshotFromFirebase(mesaNumber, (jogo) => {
            setJogo(jogo);
            if(jogo.cardQtdInThisTurn > 0){
                ExhibitCard(false, jogo.cardQtdInThisTurn);
            }
        });
        
    }
    
    function GiveHand(){
        let divHand = [];
        if(!isQtdCartasModalOpen && jogo != null){
            for(let i = 0; i < jogo.cardQtdInThisTurn; i++){
                divHand.push(<div key={i-1} className="CardInHand" onClick={e => PlayChosenCard(hand[i])}>{hand[i]}</div>)
            }
        }
        return divHand; 
    }

    function ChooseQtdFazState(){
        setQtdFazModalOpen(true);
    }

    function ExhibitCard(modalOpen, qtd){
        
        setQtdCartasModalOpen(modalOpen);
        ChooseQtdFazState();
        let cartas = [];
        for (let i = thisPlayerPosition * qtd; i < thisPlayerPosition * qtd + qtd; i++) {
            cartas.push(deck[i]);
            console.log(cartas)
        }
        
        setHand(cartas);
    }

    function ExhibitManilha(){
        if(deck[38]){
            return deck[38];
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
            <SideBar players={players}></SideBar>
            <div className="JogoBoard">
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