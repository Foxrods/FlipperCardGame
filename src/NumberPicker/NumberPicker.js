import './NumberPicker.css';
import React, { useState } from 'react';

function NumberPicker(props){
    
    function add(){
        props.handleNumberChose(props.number >= 8 ? props.number : props.number + 1);
    }
    
    function subtract(){
        props.handleNumberChose(props.number <= 0 ? props.number : props.number - 1);
    }

    return(
        <div className="Container">
            <div className="NumberBox">
                {props.number}
            </div>
            <div className="ButtonContainer">
                <button className="Button" onClick={() => add()}>
                    +
                </button>
                <button className="Button" onClick={() => subtract()}>
                    -
                </button>
            </div>
        </div>
    );
}

export default NumberPicker;