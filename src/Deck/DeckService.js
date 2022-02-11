import {db} from '../utils/firebaseUtils';
import { collection, getDocs } from 'firebase/firestore';
import { query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import Deck from '../Deck/Deck'

export default class DeckService{
    
    static async createOrUpdateDeck(mesaNumber){

        let seed = Math.floor(Math.random() * mesaNumber);
        
        const sessionCol = collection(db, "Deck");
        await setDoc(doc(sessionCol), {
            deckSeed: seed
        });
    }

    static async getDeckSeed(){
        const sessionCol = collection(db, "Deck");
        const q = query(sessionCol);
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0){
            const deck = querySnapshot.docs[0].data();
            return deck.deckSeed;
        }
        else return null;
    }
}