import classes from "./Button.module.css";

const Button = props => {
  return (
    <button onClick={props.alt ? props.close : props.open ? props.open : ()=>{}} type={props.type} className={`${classes['btn']} ${props.alt ? classes['btn-alt'] : ''}`}>{props.children}</button>
  )
}

export default Button;