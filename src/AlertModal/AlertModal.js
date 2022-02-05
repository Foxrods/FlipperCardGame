import './AlertModal.css';
import { Button, Modal } from '@material-ui/core';

export default function AlertModal(props){
    return <Modal open={props.open}>
        <div className='ContainerModalAlert'>
            <div className='TextModalAlert'>
                {props.alertText}
            </div>
            <Button className='ButtonModalAlert' variant="contained" onClick={() => props.buttonAction()}>
                Entendi
            </Button>  
        </div>
    </Modal>
}