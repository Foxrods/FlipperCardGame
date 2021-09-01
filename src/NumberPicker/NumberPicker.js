import './NumberPicker.css';
import React, { useState } from 'react';

function NumberPicker(){
    
    const [number, setNumber] = useState(0);

    function add(){
        setNumber(number >= 8 ? number : number + 1);
    }
    
    function subtract(){
        setNumber(number <= 0 ? number : number - 1);
    }

    return(
        <div className="Container">
            <div className="NumberBox">
                {number}
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