import {db} from '../utils/firebaseUtils';
import { collection, getDocs } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { format } from 'date-fns';

export default class PlayerSessionService{

    static async createNewPlayerSessionForPlayer(mesaNumber, playerName, isFirstPlayer){
        
        const sessionCol = collection(db, "SessaoDoJogador");
        await setDoc(doc(sessionCol), {
            mesa: mesaNumber,
            playerName: playerName,
            isCurrentPlayer: isFirstPlayer,
            validDate: format(new Date(), 'yyyy-MM-dd'),
            vida: 3,
            faz: 0,
            fez: 0,
            cartas: []
        });
    }
}