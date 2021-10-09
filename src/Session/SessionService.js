import Session from '../Session/Session'

export default class SessionService{
    static createSessionOnFirebase(session){
        console.log(session);
    }

    static getSessionFromFirebase(number){
        return new Session(number);
    }
}