import { format } from 'date-fns'

export default class Session{
    constructor(number){
        this.number = number;
        this.players = [];
        this.validDate = format(new Date(), 'yyyy-MM-dd');
    }

    addNewPlayer(player){
        this.players.push(player);
    }
}