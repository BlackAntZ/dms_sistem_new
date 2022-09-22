import React, {useImperativeHandle, useRef, useState} from 'react';
import classes from "./Input.module.css";

const Input = React.forwardRef( (props, ref) => {
  const [formData, setFormData] = useState({error: !props.edit, message:''});
  const [inputEmpty, setInputEmpty] = useState(false);
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

  const changeHandler = () => {
    const term = inputRef.current["value"].trim();
    const data = {};
    setInputEmpty(false);
    if (term.length === 0) return setFormData({error: true, message: ''});
    if (name !== 'email') {
      if (term.length >= 3 && (/^[a-z]+\s[a-z]+$/ig.test(term) ||/^[a-z]+$/ig.test(term))) {
        data.error=false; data.message=`${name}`;
      } else  {
        data.error=true; data.message=`Unesite validno ${name} (3 ili vise slova)!`;
      }
    }
    else {
      if ( /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(term)) {
        data.error=false; data.message='email';
      } else {
        data.error=true; data.message='Unesite validan email!';
      }
    }

    data.term = term;
    setFormData(data);
    onSubmit(name, data);
  }

  return (
    <div className={classes['div']}>
      <label htmlFor={props.name}>{props.label}</label>
      <input autoComplete={'off'} placeholder={props.label} spellCheck={"false"} defaultValue={props.value} onChange={changeHandler} ref={inputRef} id={props.name} type={props.type}></input>
      {formData.error && formData.message.length !== 0 && <i className={`bx bx-x-circle ${classes['x-circle']}`}></i>}
      {formData.error === false && formData.message.length !== 0 && <i className={`bx bx-check-circle ${classes['y-circle']}`}></i>}
      {formData.error && formData.message.length > 0 && <div className={classes['error-div']}>{formData.message}</div>}
      {inputEmpty && <div className={classes['empty-div']}>{`Unesite ${props.label.toLowerCase()}!`}</div>}
    </div>
  )
})


export default Input;