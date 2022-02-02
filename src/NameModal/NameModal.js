import './NameModal.css';
import {React, useState} from 'react';
import { Modal } from '@material-ui/core';

function NameModal(props){
    function returnToHome(){
        return window.location.href='/FlipperCardGame'
    }  

    return(
        <Modal
            open={props.open}
            aria-labelledby="name-modal"
            aria-describedby="chose-your-name">

            <div className="ContainerNameModal">
                <div className="TitleNameModal">
                    Por qual nome devemos te chamar?
                </div>

                <input 
                    value={props.name}
                    className="inputName"
                    onInput={e => props.setName(e.target.value)}>
                </input>

                <div className="footerModal">
                    <button className="CancelBtn" onClick={() => returnToHome()}>
                        SAIR
                    </button>
                    <button className="AddBtn" onClick={() => props.closeModalAndAddPlayer()}>
                        ADENTRAR
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default NameModal;