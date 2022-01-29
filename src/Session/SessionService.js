import Session from '../Session/Session';
import {db} from '../utils/firebaseUtils';
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc } from "firebase/firestore";
import { format } from 'date-fns';

export default class SessionService{

    static async createSessionOnFirebase(session){
        
        const sessionCol = collection(db, "Sessao");
        await setDoc(doc(sessionCol), {
            number: session.number, 
            players: session.players,
            validDate: session.validDate
        });
    }

    static async addPlayerToSessionOnFirebase(sessionNumber, playerName){

        const sessionCol = collection(db, "Sessao");
        const q = query(sessionCol, 
            where("number", "==", sessionNumber),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((x) => {
            let players = x.data().players;
            players.push(playerName);

            const docRef = doc(db, "Sessao", x.id);
            updateDoc(docRef, {
                players: players
            });

        });
        
    }

    static async getSessionFromFirebase(number){
        const sessionCol = collection(db, "Sessao");
        const q = query(sessionCol, 
            where("number", "==", number),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0){
            const session = querySnapshot.docs[0].data();
            return session;
        }
        else return null;
    }
}