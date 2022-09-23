import classes from "./EditUserModal.module.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import EditTagsModal from "./EditTagsModal";
import {useState} from "react";
import ConfirmModal from "../Templates/ConfirmModal";
import InputModal from "../Templates/InputModal";
import AddEditUserTagModal from "./AddEditUserTagModal";

const EditUserModal = props => {
  const [formData, setFormData] = useState({id: props.data.id, error: false});
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddEditTagModal, setOpenAddEditTagModal] = useState(false);

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
    setOpenTagsModal(true);
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
      setOpenConfirm(true);
    }
  }

  const closeTagsModalHandler = () => {
    setOpenTagsModal(false);
  }

  const closeConfirmHandler = () => {
    setOpenConfirm(false);
  }

  const openAddEditTagModalHandler = () => {
    setOpenAddEditTagModal(true);
  }

  const closeAddEditTagModalHandler = () => {
    setOpenAddEditTagModal(false);
  }

  return (
    <InputModal heading={'Uredi korisnicka odjeljenja'} index={'4'} closeModal={confirmCloseModal}>
      {openConfirm && <ConfirmModal index={5} closeModal={props.closeModal} cancelClose={closeConfirmHandler}></ConfirmModal>}
      {openTagsModal && <EditTagsModal onAddEdit={openAddEditTagModalHandler} tags={props.tags} userTags={props.data.odjeljenja} closeModal={closeTagsModalHandler}></EditTagsModal>}
      {openAddEditTagModal && <AddEditUserTagModal closeModal={closeAddEditTagModalHandler}></AddEditUserTagModal>}
      <form onSubmit={submitHandler} className={classes['modal']}>
        <Input edit={true} onSubmit={validateInputHandler} value={props.data.name} name='ime' type='text' label='Ime:'></Input>
        <Input edit={true} onSubmit={validateInputHandler} value={props.data.last_name} name='prezime' type='text' label='Prezime:'></Input>
        <Input edit={true} onSubmit={validateInputHandler} value={props.data.email} name='email' type='email' label='Email:'></Input>
        <div onClick={editTagsHandler} className={classes['position-relative']}>
          <div className={classes['label-div']}>Odjeljenja:</div>
          {props.data.odjeljenja.map(tag =>
            <i key={tag.id} style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
          )}
        </div>
        <div className={classes['buttons-div']}>
          <Button type='submit' alt={false} >Sacuvaj</Button>
        </div>
      </form>
    </InputModal>
    )
}

export default EditUserModal;