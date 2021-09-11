import CA from '../assets/cards/Clovers_A_white.png';
import C2 from '../assets/cards/Clovers_2_white.png';
import C3 from '../assets/cards/Clovers_3_white.png';
import C4 from '../assets/cards/Clovers_4_white.png';
import C5 from '../assets/cards/Clovers_5_white.png';
import C6 from '../assets/cards/Clovers_6_white.png';
import C7 from '../assets/cards/Clovers_7_white.png';
import CQ from '../assets/cards/Clovers_Queen_white.png';
import CJ from '../assets/cards/Clovers_Jack_white.png';
import CK from '../assets/cards/Clovers_King_white.png';

import HA from '../assets/cards/Hearts_A_white.png';
import H2 from '../assets/cards/Hearts_2_white.png';
import H3 from '../assets/cards/Hearts_3_white.png';
import H4 from '../assets/cards/Hearts_4_white.png';
import H5 from '../assets/cards/Hearts_5_white.png';
import H6 from '../assets/cards/Hearts_6_white.png';
import H7 from '../assets/cards/Hearts_7_white.png';
import HQ from '../assets/cards/Hearts_Queen_white.png';
import HJ from '../assets/cards/Hearts_Jack_white.png';
import HK from '../assets/cards/Hearts_King_white.png';

import PA from '../assets/cards/Pikes_A_white.png';
import P2 from '../assets/cards/Pikes_2_white.png';
import P3 from '../assets/cards/Pikes_3_white.png';
import P4 from '../assets/cards/Pikes_4_white.png';
import P5 from '../assets/cards/Pikes_5_white.png';
import P6 from '../assets/cards/Pikes_6_white.png';
import P7 from '../assets/cards/Pikes_7_white.png';
import PQ from '../assets/cards/Pikes_Queen_white.png';
import PJ from '../assets/cards/Pikes_Jack_white.png';
import PK from '../assets/cards/Pikes_King_white.png';

import TA from '../assets/cards/Tiles_A_white.png';
import T2 from '../assets/cards/Tiles_2_white.png';
import T3 from '../assets/cards/Tiles_3_white.png';
import T4 from '../assets/cards/Tiles_4_white.png';
import T5 from '../assets/cards/Tiles_5_white.png';
import T6 from '../assets/cards/Tiles_6_white.png';
import T7 from '../assets/cards/Tiles_7_white.png';
import TQ from '../assets/cards/Tiles_Queen_white.png';
import TJ from '../assets/cards/Tiles_Jack_white.png';
import TK from '../assets/cards/Tiles_King_white.png';


class Deck {
    static shuffleDeck(array){
        var currentIndex = array.length,  randomIndex;
        
        while (currentIndex != 0) {
            
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    static getDeckList(){
        return this.shuffleDeck(["A", "B", "C", "D", "E", "F", "G", "H"]);
    }
}

export default Deck;

