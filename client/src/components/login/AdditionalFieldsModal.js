import Button from "../UI/Button/Button";
import classes from "./AdditionalFieldsModal.module.css";
import InputModal from "../UI/Modal/Templates/InputModal";
import React, {useRef, useState} from "react";
import LoginInput from "../UI/Input/LoginInput";

const AdditionalFieldsModal = props => {
  const [formData, setFormData] = useState({
    grad: {value: '', error: false},
    postanski_broj: {value: '', error: false},
    drzava: {value: '', error: false},
    datum_rodj: {value: '', error: false}});
  const gradSignup = useRef();
  const postanskiBroj = useRef();
  const drzava = useRef();
  const datumRodj = useRef();


  const validateInputHandler = (type, name, data) => {
    const transformData = {};
    transformData[name] = {value: data.term, error: data.error || false};
    if (type === 'login') {
      return setFormData(prevState => {return {...prevState, ...transformData}});
    }
    return setFormData(prevState => {return {...prevState, ...transformData}});
  }

  const submitTagHandler = ev => {
    ev.preventDefault();
    props.closeModal(formData);
  }

  return (
    <InputModal alt={true} heading={'Dodatna polja'} index={'100'} closeModal={props.closeModal}>
      <form onSubmit={submitTagHandler} className={classes['content']}>
        <LoginInput  ref={gradSignup} alt={true} onChange={validateInputHandler} name={'grad'} type={'text'} placeholder={'Grad'} class={'bxs-buildings'}></LoginInput>
        <LoginInput  ref={postanskiBroj} alt={true} onChange={validateInputHandler} name={'postanski_broj'} type={'text'} placeholder={'Postanski broj'} class={'bxs-landmark'}></LoginInput>
        <LoginInput  ref={drzava} alt={true} onChange={validateInputHandler} name={'drzava'} type={'text'} placeholder={'Drzava'} class={'bxs-map'}></LoginInput>
        <LoginInput  ref={datumRodj} alt={true} onChange={validateInputHandler} name={'datum_rodj'} type={'text'} placeholder={'Datum rodjenja'} class={'bxs-baby-carriage'}></LoginInput>
        <div className={classes['buttons_div']}>
          <Button type='submit' alt={false}>Sacuvaj</Button>
        </div>
      </form>
    </InputModal>
  )
}

export default AdditionalFieldsModal;