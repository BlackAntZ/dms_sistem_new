import classes from "./LoginInput.module.css";
import React, {useRef, useState, useImperativeHandle, useEffect} from "react";

const LoginInput = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({});
  const [inputEmpty, setInputEmpty] = useState(false);
  const inputRef = useRef();

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
    const data = {};
    setInputEmpty(false);

    if (props.name === 'email') {
      if ( /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(term)) {
        data.error=false; data.message=`${props.name}`;
      } else {
        data.error=true; data.message='Unesite validan email!';
      }
    } else if (props.name === 'sifra') {
      if (term.length >= 3 && (/^.+$/ig.test(term))) {
        data.error=false; data.message=`${props.name}`;
      } else {
        data.error=true; data.message='Unesite validnu sifru (3 ili vise karaktera)!';
      }
    } else if (props.name === 'potvrdasifra') {
      if (props.sifra.length === 0) {
        props.selectPw();
        return;
      }
      if (term.length >= 3 && (/^.+$/ig.test(term)) && term === props.sifra) {
        data.error=false; data.message=`${props.name}`;
      } else if (term.length >= 3 && term !== props.sifra) {
        data.error=true; data.message=`Sifre se ne poklapaju`;
      } else {
        data.error=true; data.message='Unesite validnu sifru (3 ili vise karaktera)!';
      }
    } else if (props.name === 'korime') {
      if (term.length >= 3 && /^\S+$/ig.test(term)) {
        data.error=false; data.message=`${props.name}`;
      } else  {
        data.error=true; data.message=`Unesite validno korisnicko ime (3 ili vise karaktera  bez razmaka)!`;
      }
    } else {
      if (term.length >= 3 && (/^[a-z]+\s[a-z]+$/ig.test(term) ||/^[a-z]+$/ig.test(term))) {
        data.error=false; data.message=`${props.name}`;
      } else  {
        data.error=true; data.message=`Unesite validno ${props.name} (3 ili vise slova)!`;
      }
    }
    if (term.length === 0) {
      data.error = true; data.message = '';
    }

    data.term = term;
    setFormData(data);
    const type = props.alt ? 'signup' : 'login';
    props.onChange(type, props.name, data);
  }

  const resetInputs = () => {
    setFormData({error: true, message: ''});
  }

  useEffect(() => {
    resetInputs();
  },[props.reset]);

  return (
    <div className={classes["input-field"]}>
      <i className={`bx ${props.class}`}></i>
      <input value={props.value} spellCheck={"false"} onChange={changeHandler} ref={inputRef} name={props.name} type={props.type} placeholder={props.placeholder}/>
      {formData.error && inputRef.current['value'].length > 0 && <i className={`bx bx-x-circle ${classes['x-circle']}`}></i>}
      {formData.error === false && inputRef.current['value'].length > 0 && <i className={`bx bx-check-circle ${classes['y-circle']}`}></i>}
      {formData.error && inputRef.current['value'].length > 0 && <div className={classes['error-div']}>{formData.message}</div>}
      {inputEmpty && <div className={classes['empty-div']}>{`Unesite ${props.placeholder.toLowerCase()}!`}</div>}
    </div>
  )
})

export default LoginInput;