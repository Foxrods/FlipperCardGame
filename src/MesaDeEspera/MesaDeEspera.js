import PlayerTag from '../PlayerTag/PlayerTag';
import './MesaDeEspera.css';
import { useParams, Link } from "react-router-dom";
import { Button } from '@material-ui/core';

function MesaDeEspera(){
    let { mesaNumber } = useParams();
    return (
        <div>
            <header className="Mesa-header">
            FLIPPER
            </header>
            <div className="Mesa">
                <h1 className="Mesa-number">
                    MESA: {mesaNumber}
                </h1>
                <PlayerTag></PlayerTag>
                <PlayerTag></PlayerTag>
                <PlayerTag></PlayerTag>
                <PlayerTag></PlayerTag>
                
            </div>
            <p className="Mesa-button">
                <Button variant="contained" component={Link} to={`/jogo/${mesaNumber}`} size="large">
                    INICIAR
                </Button>
            </p>
        </div>
    );
}

export default MesaDeEspera;