import classes from "./ConfirmModal.module.css";
import Button from "../Button/Button";

const ConfirmModal = props => {
  return (
    <div style={{zIndex: props.index}} className={classes['modal']}>
      <h1>Imate nesacuvane izmjene.</h1>
      <h1>Izadji bez cuvanja?</h1>
      <div className={classes['buttons-div']}>
        <Button type='reset' alt={true} close={props.closeModal}>Da</Button>
        <Button type='submit' alt={false} open={props.cancelClose} >Ne</Button>
      </div>
    </div>
  )
}

export default ConfirmModal;