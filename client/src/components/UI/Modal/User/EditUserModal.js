import classes from "./EditUserModal.module.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import EditTagsModal from "./EditTagsModal";
import {useCallback, useState} from "react";
import ConfirmModal from "../Templates/ConfirmModal";
import InputModal from "../Templates/InputModal";
import AddEditUserTagModal from "./AddEditUserTagModal";

const EditUserModal = props => {
  const [formData, setFormData] = useState({id: props.data.id, error: !props.edit});
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddEditTagModal, setOpenAddEditTagModal] = useState(false);

  const postUpdateUserData = async () => {
    const transformedData = formData;
    delete transformedData.error;
    const response = await fetch('/admin/users/edit', {
      method: 'POST',
      body: JSON.stringify(transformedData),
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
      console.log('Imate gresku');
    }
    else {
      postUpdateUserData().then(r => {
        if (r === 'Dodano') {
          props.closeModal(true);
        } else console.log('Greska');
      });
    }
  }

  const editTagsHandler = () => {
    setOpenTagsModal(true);
  }

  const validateInputHandler = useCallback((name, data) => {
    const transformData = {};
    transformData.error = data.error;
    transformData[name] = {value: data.term, edited: data.edited};
    return setFormData(prevState => {return {...prevState, ...transformData}});
  },[]);

  const confirmCloseModal = () => {
    for (const formDataKey in formData) {
      if (formDataKey !== 'error' && formDataKey !== 'id' && formData[formDataKey].edited === true) {
        console.log('Was edited');
        if (formData.error) console.log('But has error');
        return setOpenConfirm(true);
      }
    }
    console.log('Was NOT edited');
    props.closeModal();
    // if (Object.keys(formData).length === 2 && Object.getPrototypeOf(formData) === Object.prototype) {
    //   props.closeModal();
    // }
    // else {
    //   setOpenConfirm(true);
    // }
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

  const argumentsInput = {
    edit: props.edit,
    onSubmit: validateInputHandler
  }

  return (
    <InputModal heading={`${props.edit ? 'Uredi korisnicke podatke' : 'Unesi novog korisnika'}`} index={'4'} closeModal={confirmCloseModal}>
      {openConfirm && <ConfirmModal index={5} closeModal={props.closeModal} cancelClose={closeConfirmHandler}></ConfirmModal>}
      {openTagsModal && <EditTagsModal onAddEdit={openAddEditTagModalHandler} tags={props.tags} userTags={props.data.odjeljenja} closeModal={closeTagsModalHandler}></EditTagsModal>}
      {openAddEditTagModal && <AddEditUserTagModal closeModal={closeAddEditTagModalHandler}></AddEditUserTagModal>}
      <form onSubmit={submitHandler} className={classes['modal']}>
        <Input {...argumentsInput} mandatory={true} value={props.data.korime} name='korime' type='text' label='Korisnicko ime:'></Input>
        <Input {...argumentsInput} mandatory={true} value={props.data.ime} name='ime' type='text' label='Ime:'></Input>
        <Input {...argumentsInput} mandatory={true} value={props.data.prezime} name='prezime' type='text' label='Prezime:'></Input>
        <Input {...argumentsInput} mandatory={true} value={props.data.email} name='email' type='email' label='Email:'></Input>
        <Input {...argumentsInput} value={props.data.grad} name='grad' type='text' label='Grad:'></Input>
        <Input {...argumentsInput} value={props.data.postanski_broj} name='postanski_broj' type='text' label='Postanski broj:'></Input>
        <Input {...argumentsInput} value={props.data.drzava} name='drzava' type='text' label='Drzava:'></Input>
        <Input {...argumentsInput} value={props.data.datum_rodj} name='datum_rodj' type='text' label='Datum rodjenja:'></Input>
        <div onClick={editTagsHandler} className={classes['position-relative']}>
          <div className={classes['label-div']}>Odjeljenja:</div>
          {props.data.id && props.data.odjeljenja.map(tag =>
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