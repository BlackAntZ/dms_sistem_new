import { useRef, useState} from 'react';
import classes from "./Input.module.css";

const Input = props => {
  const [formData, setFormData] = useState({error: !props.edit, message:''});
  const inputRef = useRef();

  const {name} = props;
  const {onSubmit} = props;

  const changeHandler = () => {
    const term = inputRef.current["value"].trim();
    const data = {};
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
      <input spellCheck={"false"} defaultValue={props.value} onChange={changeHandler} ref={inputRef} id={props.name} type={props.type}></input>
      {formData.error && <i className={`bx bx-x-circle ${classes['x-circle']}`}></i>}
      {formData.error === false && <i className={`bx bx-check-circle ${classes['y-circle']}`}></i>}
      {formData.error && formData.message.length > 0 && <div className={classes['error-div']}>{formData.message}</div>}
    </div>
  )
}


export default Input;