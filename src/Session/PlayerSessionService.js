import {db} from '../utils/firebaseUtils';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { format } from 'date-fns';

export default class PlayerSessionService{

    static async createNewPlayerSessionForPlayer(mesaNumber, playerName, isFirstPlayer, position){
        
        const sessionCol = collection(db, "SessaoDoJogador");
        await setDoc(doc(sessionCol), {
            mesa: mesaNumber,
            playerName: playerName,
            isCurrentPlayer: isFirstPlayer,
            validDate: format(new Date(), 'yyyy-MM-dd'),
            vida: 3,
            faz: 0,
            fez: 0,
            cartas: [],
            isReady: false,
            position: position
        });
    }

    static async getPlayersInsideSession(number, returnPlayers){
        const sessionCol = collection(db, "SessaoDoJogador");
        const q = query(sessionCol, 
            where("mesa", "==", number),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')),
            orderBy("position", "asc"));

        onSnapshot(q, (querySnapshot) => {
            if(querySnapshot.docs.length > 0){
                let players = querySnapshot.docs.map(x => x.data());
                returnPlayers(players);
            }
        });
    }

    static async updatePlayerSession(player){
        const sessionCol = collection(db, "SessaoDoJogador");
        const q = query(sessionCol, 
            where("mesa", "==", player.mesa),
            where("playerName", "==", player.playerName),
            where("validDate", "==", player.validDate));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((x) => {
            const docRef = doc(db, "SessaoDoJogador", x.id);
            updateDoc(docRef, player);
        });
    }
}