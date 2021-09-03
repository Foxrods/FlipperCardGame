import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./Home/Home";
import MesaDeEspera from "./MesaDeEspera/MesaDeEspera"
import Jogo from "./Jogo/Jogo"

const Routes = () => {
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route exact path="/"                 component = { Home }   />
            <Route exact path="/mesa/:mesaNumber" component = { MesaDeEspera }/>
            <Route exact path="/jogo/:mesaNumber" component = { Jogo }/>
        </BrowserRouter>
    )
 }
 
 export default Routes;