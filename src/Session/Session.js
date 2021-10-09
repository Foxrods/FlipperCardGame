export default class Session{
    constructor(number){
        this.number = number;
        this.players = [];
    }

    addNewPlayer(player){
        this.players.push(player);
    }
}