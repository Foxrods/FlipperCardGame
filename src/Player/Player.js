export default class Player{
    constructor(name, session){
        this.name = name,
        this.session = session,
        this.isPlayerTurn = false;
        this.health = 3;
        this.faz = 0;
        this.isRoundWinner = false;
    }
}