import './NumberPicker.css';
import React from 'react';

function NumberPicker(props){
    
    function add(){
        props.handleNumberChose(props.number >= props.max ? props.number : props.number + 1);
    }
    
    function subtract(){
        props.handleNumberChose(props.number <= props.min ? props.number : props.number - 1);
    }

    return(
        <div className="Container">
            <div className="NumberBox">
                {props.number}
            </div>
            <div className="ButtonContainer">
                <button className="Buttonplus" onClick={() => add()}>
                    +
                </button>
                <button className="Button" onClick={() => subtract()}>
                    –
                </button>
            </div>
        </div>
    );
}

export default NumberPicker;