import './NumberModal.css';
import React from 'react';
import NumberPicker from '../NumberPicker/NumberPicker';
import { Modal } from '@material-ui/core';
import { useState  } from 'react'

function NumberModal(props){

    const [number, setNumber] = useState(props.min);
    let handleNumberChose = e => setNumber(e);

    return(
        <Modal
            open={props.open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

                <div className="ContainerModal">
                    <div className="Title">
                        {props.title}
                    </div>
                    <div>

                    <NumberPicker
                        number={number}
                        handleNumberChose={handleNumberChose}
                        max={props.max}
                        min={props.min}
                        >  
                    </NumberPicker>

                    <button className="OkButton" onClick={() => props.handleModalOpen(false, number)}>
                        CONFIRMAR
                    </button>

                    </div>
                </div>
        </Modal>
    );
}

export default NumberModal;