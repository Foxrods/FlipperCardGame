import Deck from '../Deck/Deck'
import DeckService from '../Deck/DeckService';
import PlayerSessionService from '../Session/PlayerSessionService';

export default class GameManager{

    static deckSeed = 0;
    static players = [];
      
    static getDeckList(){
        if(this.deckSeed == 0)
            DeckService.getDeckSeed().then(seed => this.deckSeed = seed);
        
        return Deck.getDeckList(this.deckSeed);
    }
    
    static getPlayersInSession(mesaNumber){
        
        PlayerSessionService.getPlayersInsideSession(mesaNumber).then(x => this.players = x);
        
        return this.players;
    }
}