import {db} from '../utils/firebaseUtils';
import { collection, getDocs } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { format } from 'date-fns';

export default class SessionService{

    static async createSessionOnFirebase(session){
        
        const sessionCol = collection(db, "Sessao");
        await setDoc(doc(sessionCol), {
            number: session.number, 
            players: session.players,
            validDate: session.validDate,
            gameIniciated: false
        });
    }

    static async addPlayerToSessionOnFirebase(sessionNumber, playerName){

        const sessionCol = collection(db, "Sessao");
        const q = query(sessionCol, 
            where("gameIniciated", "==", false),
            where("number", "==", sessionNumber),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')),);

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
            where("gameIniciated", "==", false),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0){
            const session = querySnapshot.docs[0].data();
            return session;
        }
        else return null;
    }

    static async getSessionSnapshotFromFirebase(number, returnSession){
        const sessionCol = collection(db, "Sessao");
        const q = query(sessionCol, 
            where("number", "==", number),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')));

        onSnapshot(q, (querySnapshot) => {
            if(querySnapshot.docs.length > 0){
                const session = querySnapshot.docs[0].data();
                returnSession(session);
            }
        });
    }

    static async iniciateGameSession(number){
        const sessionCol = collection(db, "Sessao");
        const q = query(sessionCol, 
            where("number", "==", number),
            where("gameIniciated", "==", false),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')),);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((x) => {
            const docRef = doc(db, "Sessao", x.id);
            updateDoc(docRef, {
                gameIniciated: true
            });

        });
    }
}