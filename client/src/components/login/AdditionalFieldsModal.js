import Button from "../UI/Button/Button";
import classes from "./AdditionalFieldsModal.module.css";
import InputModal from "../UI/Modal/Templates/InputModal";
import React, {useRef, useState} from "react";
import LoginInput from "../UI/Input/LoginInput";

const AdditionalFieldsModal = props => {
  // const [formData, setFormData] = useState({parent: {value: `${props.tag}`, error: false}, child: {value: '0', error: false}, naziv: {value: '', error: true}, boja: {value: '', error: true}});
  // const [pickedColor, setPickedColor] = useState(false);
  const gradSignup = useRef();
  const postanskiBroj = useRef();
  const drzava = useRef();
  const datumRodj = useRef();


  const validateInputHandler = (name, data) => {
  //   const transformData = {};
  //   transformData[name] = {value: data.term, error: data.error || false};
  //   return setFormData(prevState => {return {...prevState, ...transformData}});
  }
  //
  // const postTagData = async () => {
  //   props.closeModal();
  //   const transformedData = {};
  //   for (const dataKey in formData) {
  //     transformedData[dataKey] = formData[dataKey].value;
  //   }
  //   const responose = await fetch('admin/tag', {
  //     method: 'POST',
  //     body: JSON.stringify(transformedData),
  //     headers : {'Content-Type': 'application/json'}
  //   })
  //   return responose.json();
  // }
  //
  const submitTagHandler = ev => {
    ev.preventDefault();
  //   for (const loginDataKey in formData) {
  //     if (formData[loginDataKey].error) {
  //       if (loginDataKey === 'naziv') {
  //         tagName.current['focus']();
  //         if (formData[loginDataKey].value.trim().length === 0) tagName.current['empty']();
  //         return;
  //       }
  //       if (loginDataKey === 'boja') {
  //         setPickedColor(true);
  //         bojaRef.current['click']();
  //         return;
  //       }
  //     }
  //   }
  //   postTagData().then(r => {
  //     console.log(r);
  //     if (r === 'Uspjesno dodano') props.onAdd();
  //   })
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