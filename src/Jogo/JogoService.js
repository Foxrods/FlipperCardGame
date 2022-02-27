import {db} from '../utils/firebaseUtils';
import { collection, getDocs } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { format } from 'date-fns';

export default class JogoService{

    static async createJogoOnFirebase(mesaNumber){
        const sessionCol = collection(db, "Jogo");
        await setDoc(doc(sessionCol), {
            number: mesaNumber, 
            validDate: format(new Date(), 'yyyy-MM-dd'),
            cardQtdInThisTurn: 0,
            cardsInTable: []
        });
    }

    static async getJogoSnapshotFromFirebase(mesaNumber, returnJogo){
        const sessionCol = collection(db, "Jogo");
        const q = query(sessionCol, 
            where("number", "==", mesaNumber),
            where("validDate", "==", format(new Date(), 'yyyy-MM-dd')));

        onSnapshot(q, (querySnapshot) => {
            if(querySnapshot.docs.length > 0){
                const jogo = querySnapshot.docs[0].data();
                returnJogo(jogo);
            }
        });
    }

    static async updateJogo(jogo){
        const sessionCol = collection(db, "Jogo");
        const q = query(sessionCol, 
            where("number", "==", jogo.number),
            where("validDate", "==", jogo.validDate));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((x) => {
            const docRef = doc(db, "Jogo", x.id);
            updateDoc(docRef, {
                cardQtdInThisTurn: jogo.cardQtdInThisTurn,
                cardsInTable: jogo.cardsInTable
            });
        });
    }
}