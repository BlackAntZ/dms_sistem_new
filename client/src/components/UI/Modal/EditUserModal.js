import classes from "./EditUserModal.module.css";
import ReactDOM from "react-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import EditTagsModal from "./EditTagsModal";
import {useState} from "react";
import ConfirmModal from "./ConfirmModal";

export const BackDrop = props => {
  return (
    <div style={{zIndex: props.index}} onClick={props.closeModal} className="backdrop"></div>
  )
}

const Modal = props => {
  const [formData, setFormData] = useState({id: props.userData.id, error: false});

  const postUpdateUserData = async () => {
    const response = await fetch('/main', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers : {'Content-Type': 'application/json'}
    })
    return await response.json();
  }

  const submitHandler = ev => {
    ev.preventDefault();
    if (Object.keys(formData).length === 2 && Object.getPrototypeOf(formData) === Object.prototype) {
      props.closeModal();
    }
    else if (formData.error) {
      console.log('Has error');
    }
    else {
      postUpdateUserData().then(r => console.log(r));
    }
  }

  const editTagsHandler = () => {
    props.editTags();
  }

  const validateInputHandler = (name, data) => {
    const transformData = {};
    transformData.error = data.error;
    transformData[name] = data.term;
    return setFormData(prevState => {return {...prevState, ...transformData}});
  }

  const confirmCloseModal = () => {
    if (Object.keys(formData).length === 2 && Object.getPrototypeOf(formData) === Object.prototype) {
      props.closeModal();
    }
    else {
      props.confirmExit();
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes['modal']}>
      <Input edit={true} onSubmit={validateInputHandler} value={props.userData.name} name='ime' type='text' label='Ime:'></Input>
      <Input edit={true} onSubmit={validateInputHandler} value={props.userData.last_name} name='prezime' type='text' label='Prezime:'></Input>
      <Input edit={true} onSubmit={validateInputHandler} value={props.userData.email} name='email' type='email' label='Email:'></Input>
      <div onClick={editTagsHandler} className={classes['position-relative']}>
        <div className={classes['label-div']}>Odjeljenja:</div>
        {props.userData.odjeljenja.map(tag =>
          <i key={tag.id} style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
        )}
      </div>
      <div className={classes['buttons-div']}>
        <Button type='button' alt={true} close={confirmCloseModal}>Ponisti</Button>
        <Button type='submit' alt={false} >Sacuvaj</Button>
      </div>
    </form>
  )
}

const EditUserModal = props => {
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const closeTagsModalHandler = () => {
    setOpenTagsModal(false);
  }

  const openTagsModalHandler = () => {
    setOpenTagsModal(true);
  }

  const openConfirmHandler = () => {
    setOpenConfirm(true);
  }

  const closeConfirmHandler = () => {
    setOpenConfirm(false);
  }

  return (
    <>
      {ReactDOM.createPortal(<BackDrop closeModal={props.closeModal}></BackDrop>, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<Modal confirmExit={openConfirmHandler} userData={props.data} editTags={openTagsModalHandler} closeModal={props.closeModal}></Modal>, document.getElementById('overlays'))}
      {openTagsModal && ReactDOM.createPortal(<BackDrop index={4} closeModal={closeTagsModalHandler}></BackDrop>, document.getElementById('overlays'))}
      {openTagsModal && ReactDOM.createPortal(<EditTagsModal tags={props.tags} userTags={props.data.odjeljenja} closeModal={closeTagsModalHandler}></EditTagsModal>, document.getElementById('overlays'))}
      {openConfirm && ReactDOM.createPortal(<BackDrop index={4} closeModal={closeConfirmHandler}></BackDrop>, document.getElementById('overlays'))}
      {openConfirm && ReactDOM.createPortal(<ConfirmModal index={4} closeModal={props.closeModal} cancelClose={closeConfirmHandler}></ConfirmModal>, document.getElementById('overlays'))}
    </>
  )
}

export default EditUserModal;