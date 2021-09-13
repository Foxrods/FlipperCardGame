import React from 'react';
import './Card.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            naipe: props.naipe,
            valor: props.valor,
            valorReal: props.valorReal
        }
    }

    render(){
        return (
            <img src={this.props.image}/>
        );
    };
}

export default Card;