import './Jogo.css';
import SideBar from '../SideBar/SideBar';
import NumberModal from '../NumberModal/NumberModal';
import React, { useState, useEffect  } from 'react';
import { useParams } from "react-router-dom";
import GameManager from '../GameManager/GameManager';
import PlayerSessionService from '../Session/PlayerSessionService';
import JogoService from './JogoService';

function Jogo(){
    //state vars and callbacks
    let { mesaNumber } = useParams();
    let thisPlayerPosition = 0;
    let thisPlayer = null;
    const [jogo, setJogo] = useState();
    const [players, setPlayers] = useState([]);
    const [synced, setSynced] = useState(false);
    const [deck, setDeck] = useState(GameManager.getDeckList());
    const [hand, setHand] = useState([]);

    const [cardQtd, setCardQtd] = useState(0);
    let handleNumberChose = e => setCardQtd(e);

    const [isQtdCartasModalOpen, setQtdCartasModalOpen] = useState(false);
    let handleQtdCartasModalOpen = e => {
        let innerJogo = jogo;
        jogo.cardQtdInThisTurn = cardQtd;
        setJogo(innerJogo);
        JogoService.updateJogo(jogo)
        ExhibitCard(e, cardQtd);
    }

    const [qtdFaz, setQtdFaz] = useState(0);
    let handleQtdFazChose = e => setQtdFaz(e);

    const [isQtdFazModalOpen, setQtdFazModalOpen] = useState(false);
    let handleQtdFazModalOpen = e => {
        // thisPlayer = players.find(x => x.playerName === localStorage.getItem('PlayerName'));
        // thisPlayer.faz = qtdFaz;
        // PlayerSessionService.updatePlayerSession(thisPlayer);
        
        setQtdFazModalOpen(e);
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
                console.log(thisPlayer)
                thisPlayerPosition = players.indexOf(thisPlayer);
                setSynced(true);
                setPlayers(players);
                setQtdCartasModalOpen(thisPlayer.isCurrentPlayer);
            });
        }
    }

    function loadJogo(){
        JogoService.getJogoSnapshotFromFirebase(mesaNumber, (jogo) => {
            setJogo(jogo);
            setCardQtd(jogo.cardQtdInThisTurn);
            if(jogo.cardQtdInThisTurn > 0){
                ExhibitCard(false, jogo.cardQtdInThisTurn);
            }
        });
    }
    
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

    function ExhibitCard(modalOpen, qtd){
        
        setQtdCartasModalOpen(modalOpen);
        ChooseQtdFazState();
        let cartas = [];
        for (let i = thisPlayerPosition * qtd; i < thisPlayerPosition * qtd + qtd; i++) {
            cartas.push(deck[i]);
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