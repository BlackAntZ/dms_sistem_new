import classes from "./ToolTip.module.css";

const ToolTip = props => {
  return (
    <div className={classes['position-relative']}>
      {props.children}
      <span className={classes['tooltip']}>{props.text}</span>
    </div>
  )
}

export default ToolTip;