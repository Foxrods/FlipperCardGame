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

import Card from '../Card/Card';

class Deck{
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
        let deck = [
            <Card naipe="Clovers" valor="A" valorReal="8"  image={CA}></Card>,
            <Card naipe="Clovers" valor="2" valorReal="9"  image={C2}></Card>,
            <Card naipe="Clovers" valor="3" valorReal="10" image={C3}></Card>,
            <Card naipe="Clovers" valor="4" valorReal="1"  image={C4}></Card>,
            <Card naipe="Clovers" valor="5" valorReal="2"  image={C5}></Card>,
            <Card naipe="Clovers" valor="6" valorReal="3"  image={C6}></Card>,
            <Card naipe="Clovers" valor="7" valorReal="4"  image={C7}></Card>,
            <Card naipe="Clovers" valor="Q" valorReal="5"  image={CQ}></Card>,
            <Card naipe="Clovers" valor="J" valorReal="6"  image={CJ}></Card>,
            <Card naipe="Clovers" valor="K" valorReal="7"  image={CK}></Card>,
            <Card naipe="Hearts"  valor="A" valorReal="8"  image={HA}></Card>,
            <Card naipe="Hearts"  valor="2" valorReal="9"  image={H2}></Card>,
            <Card naipe="Hearts"  valor="3" valorReal="10" image={H3}></Card>,
            <Card naipe="Hearts"  valor="4" valorReal="1"  image={H4}></Card>,
            <Card naipe="Hearts"  valor="5" valorReal="2"  image={H5}></Card>,
            <Card naipe="Hearts"  valor="6" valorReal="3"  image={H6}></Card>,
            <Card naipe="Hearts"  valor="7" valorReal="4"  image={H7}></Card>,
            <Card naipe="Hearts"  valor="Q" valorReal="5"  image={HQ}></Card>,
            <Card naipe="Hearts"  valor="J" valorReal="6"  image={HJ}></Card>,
            <Card naipe="Hearts"  valor="K" valorReal="7"  image={HK}></Card>,
            <Card naipe="Pikes"   valor="A" valorReal="8"  image={PA}></Card>,
            <Card naipe="Pikes"   valor="2" valorReal="9"  image={P2}></Card>,
            <Card naipe="Pikes"   valor="3" valorReal="10" image={P3}></Card>,
            <Card naipe="Pikes"   valor="4" valorReal="1"  image={P4}></Card>,
            <Card naipe="Pikes"   valor="5" valorReal="2"  image={P5}></Card>,
            <Card naipe="Pikes"   valor="6" valorReal="3"  image={P6}></Card>,
            <Card naipe="Pikes"   valor="7" valorReal="4"  image={P7}></Card>,
            <Card naipe="Pikes"   valor="Q" valorReal="5"  image={PQ}></Card>,
            <Card naipe="Pikes"   valor="J" valorReal="6"  image={PJ}></Card>,
            <Card naipe="Pikes"   valor="K" valorReal="7"  image={PK}></Card>,
            <Card naipe="Tiles"   valor="A" valorReal="8"  image={TA}></Card>,
            <Card naipe="Tiles"   valor="2" valorReal="9"  image={T2}></Card>,
            <Card naipe="Tiles"   valor="3" valorReal="10" image={T3}></Card>,
            <Card naipe="Tiles"   valor="4" valorReal="1"  image={T4}></Card>,
            <Card naipe="Tiles"   valor="5" valorReal="2"  image={T5}></Card>,
            <Card naipe="Tiles"   valor="6" valorReal="3"  image={T6}></Card>,
            <Card naipe="Tiles"   valor="7" valorReal="4"  image={T7}></Card>,
            <Card naipe="Tiles"   valor="Q" valorReal="5"  image={TQ}></Card>,
            <Card naipe="Tiles"   valor="J" valorReal="6"  image={TJ}></Card>,
            <Card naipe="Tiles"   valor="K" valorReal="7"  image={TK}></Card>,
        ]                   

        return this.shuffleDeck(deck);
    }
}

export default Deck;

