import './NumberModal.css';
import React, { useState } from 'react';
import NumberPicker from '../NumberPicker/NumberPicker';
import { Modal } from '@material-ui/core';

function NumberModal(props){
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
                        number={props.number}
                        handleNumberChose={props.handleNumberChose}
                        max={props.max}
                        min={props.min}
                        >  
                    </NumberPicker>

                    <button className="OkButton" onClick={() => props.handleModalOpen(false)}>
                        Confirmar
                    </button>

                    </div>
                </div>
        </Modal>
    );
}

export default NumberModal;