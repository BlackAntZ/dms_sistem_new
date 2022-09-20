import classes from "./InputModal.module.css";
import Button from "../../Button/Button";
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";
import {BackDrop} from "./InputModal";

const Modal = props => {
  const [modalClasses, setModalClasses] = useState(`${classes.modal} ${classes.hidden}`);

  useEffect(()=> {
    setModalClasses(`${classes.modal}`);
  },[])

  return (
    <div style={{zIndex: props.index}} className={modalClasses}>
      <div className={classes['modal__header']}>
        <h2>Imate nesacuvane izmjene.</h2>
        <h2>Izadji bez cuvanja?</h2>
        <div onClick={props.cancelClose} className={classes['modal__close']}>
          <i className='bx bx-x-circle'></i>
        </div>
      </div>
      <div className={classes['buttons-div']}>
        <Button type='submit' alt={true} close={props.closeModal}>Da</Button>
      </div>
    </div>
  )
}

const ConfirmModal = props => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop index={props.index} closeModal={props.cancelClose}></BackDrop>, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<Modal index={props.index} closeModal={props.closeModal} cancelClose={props.cancelClose}></Modal>, document.getElementById('overlays'))}
    </>
  )
}

export default ConfirmModal;