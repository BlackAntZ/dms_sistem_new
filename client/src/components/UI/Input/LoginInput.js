import classes from "./LoginInput.module.css";
import React, {useRef, useState, useImperativeHandle, useEffect} from "react";
import DatePicker from "../DatePicker/DatePicker";
const inputVal = require('../../../validation/input.validation');

const LoginInput = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({});
  const [inputEmpty, setInputEmpty] = useState(false);
  const inputRef = useRef();
  const [openPicker, setOpenPicker] = useState(false);

  const inputEmptyHandler = () => {
    setInputEmpty(true);
  }

  const focus = () => {
    inputRef.current['focus']();
  }

  useImperativeHandle(ref, ()=>{
    return {focus: focus, empty: inputEmptyHandler}
  })

  const changeHandler = () => {
    const term = inputRef.current["value"].trim();
    setInputEmpty(false);
    const data = inputVal.inputValidation(props.name, term, props.edit ? props.value : '', props.sifra, props.selectPw);

    data.term = term;
    setFormData(data);
    const type = props.alt ? 'signup' : 'login';
    props.onChange(type, props.name, data);
  }

  const onDateSelectHandler = val => {
    const type = props.alt ? 'signup' : 'login';
    const data = {term: val, error: false, message: `${props.name}`};
    props.onChange(type, props.name, data);
  }

  const resetInputs = () => {
    setFormData({error: true, message: ''});
  }

  useEffect(() => {
    resetInputs();
  },[props.reset]);

  const onFocusHandler = () => {
    setOpenPicker(true);
  }

  return (
    <div className={classes["input-field"]}>
      <i className={`bx ${props.class}`}></i>
      {!openPicker && props.name === 'datum_rodj' && <input className={classes['input_date']}
                                             type={props.type} onFocus={onFocusHandler} placeholder={props.placeholder}/>}
      {openPicker && <DatePicker onSelect={onDateSelectHandler}></DatePicker>}
      {props.name !== 'datum_rodj' && <input id={props.name} value={props.value} spellCheck={"false"} onChange={changeHandler} ref={inputRef}
              name={props.name} type={props.type} placeholder={props.placeholder}/>}
      {props.name !== 'datum_rodj' && formData.error && inputRef.current['value'].length > 0 && <i className={`bx bx-x-circle ${classes['x-circle']}`}></i>}
      {props.name !== 'datum_rodj' && formData.error === false && inputRef.current['value'].length > 0 && <i className={`bx bx-check-circle ${classes['y-circle']}`}></i>}
      {props.name !== 'datum_rodj' && formData.error && inputRef.current['value'].length > 0 && <div className={classes['error-div']}>{formData.message}</div>}
      {props.name !== 'datum_rodj' && inputEmpty && <div className={classes['empty-div']}>{`Unesite ${props.placeholder.toLowerCase()}!`}</div>}
      {props.name !== 'datum_rodj' && props.must && !inputEmpty && inputRef.current && inputRef.current['value'].trim().length === 0 && <div className={classes.alert}>
        <i className={`bx bx-alarm-exclamation`}></i>Obavezno polje</div>}
    </div>
  )
})

export default LoginInput;