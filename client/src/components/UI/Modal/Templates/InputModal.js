import classes from "./InputModal.module.css";
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";

export const BackDrop = props => {
  return (
    <div style={{zIndex: props.index}} onClick={props.closeModal} className="backdrop"></div>
  )
}

const Modal = props => {
  const [modalClasses, setModalClasses] = useState(`${classes.modal} ${classes.hidden}`);

  useEffect(()=> {
    setModalClasses(`${classes.modal}`);
  },[])

  return (
    <div style={{zIndex: props.index}} className={modalClasses}>
      <div className={classes['modal__header']}>
        <h2>
          {props.heading}
        </h2>
        <div onClick={props.closeModal} className={classes['modal__close']}>
          <i className='bx bx-x-circle'></i>
        </div>
      </div>
      {props.children}
    </div>
  )
}

const InputModal = props => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop index={props.index} closeModal={props.closeModal}></BackDrop>, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<Modal heading={props.heading} index={props.index} closeModal={props.closeModal}>{props.children}</Modal>, document.getElementById('overlays'))}
    </>
  )
}

export default InputModal;