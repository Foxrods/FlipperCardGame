import './NumberModal.css';
import React, { useState } from 'react';
import NumberPicker from '../NumberPicker/NumberPicker';
import { Modal } from '@material-ui/core';

function NumberModal(props){
    let open = true;
    return(
        <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <div className="ContainerModal">
                    <div className="Title">
                        {props.title}
                    </div>
                    <div>

                    <NumberPicker></NumberPicker>
                    <button className="OkButton">
                        Confirmar
                    </button>
                    </div>
                </div>
        </Modal>
    );
}

export default NumberModal;