import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import classes from "./Input.module.css";
import inputVal from "../../../validation/input.validation";
import DatePicker from "../DatePicker/DatePicker";

const Input = React.forwardRef( (props, ref) => {
  const [formData, setFormData] = useState({error: !props.edit, message:''});
  const [inputEmpty, setInputEmpty] = useState(false);
  // const [dataEdited, setDataEdited] = useState(false);
  const inputRef = useRef();

  const {name} = props;
  const {onSubmit} = props;

  const inputEmptyHandler = () => {
    setInputEmpty(true);
  }

  const focus = () => {
    inputRef.current['focus']();
  }

  useImperativeHandle(ref, () => {
    return {focus: focus, empty: inputEmptyHandler}
  })

  const changeHandler = useCallback(() => {
    if (!inputRef.current) return;
    const term = inputRef.current["value"].trim();
    const data = inputVal.inputValidation(name, term, props.edit ? props.value : '');

    setInputEmpty(false);
    data.term = term;
    setFormData(data);
    onSubmit(name, data);
  },[name, onSubmit, props.edit, props.value]);

  useEffect(()=> {
    if (!props.edit) changeHandler();
  },[props.edit,changeHandler]);

  const onDateSelectHandler = val => {
    const data = {term: val, error: false, message: `${props.name}`, edited: true};
    onSubmit(props.name, data);
  }

  return (
    <div className={classes['div']}>
      <label htmlFor={props.name}>{props.label}</label>
      {props.name === 'datum_rodj' && <DatePicker edit={true} value={props.value} alt={true} onSelect={onDateSelectHandler}></DatePicker>}
      {props.name !== 'datum_rodj' && <input autoComplete={'off'} placeholder={props.placeholder} spellCheck={"false"} defaultValue={props.value}
              onChange={changeHandler} ref={inputRef} id={props.name} type={props.type}></input>}
      {props.name !== 'datum_rodj' && formData.error && formData.message.length !== 0 && <i className={`bx bx-x-circle ${classes['x-circle']}`}></i>}
      {props.name !== 'datum_rodj' && formData.error === false && formData.message.length !== 0 && <i className={`bx bx-check-circle ${classes['y-circle']}`}></i>}
      {props.name !== 'datum_rodj' && formData.error && formData.message.length > 0 && <div className={classes['error-div']}>{formData.message}</div>}
      {props.name !== 'datum_rodj' && inputEmpty && <div className={classes['empty-div']}>{`Unesite ${props.label.toLowerCase()}!`}</div>}
      {props.name !== 'datum_rodj' && props.mandatory && !inputEmpty && inputRef.current && inputRef.current['value'].trim().length === 0 && <div className={classes.alert}>
        <i className={`bx bx-alarm-exclamation`}></i>Obavezno polje</div>}
    </div>
  )
})

export default Input;