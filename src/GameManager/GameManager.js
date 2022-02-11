import Deck from '../Deck/Deck'
import DeckService from '../Deck/DeckService';

export default class GameManager{

    static deckSeed = 0;
      
    static getDeckList(){
        if(this.deckSeed == 0){
            
            DeckService.getDeckSeed().then(seed =>{
                this.deckSeed = seed;
                }
            );
        }
        
        return Deck.getDeckList(this.deckSeed);
    }   
}