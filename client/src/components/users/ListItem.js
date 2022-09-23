import classes from './ListItem.module.css';
import ToolTip from "../UI/Tooltip/ToolTip";

const ListItem = props => {
  const openEditUserHandler = () => {
    props.openModal({id: props.id, name: props.name, last_name: props.last_name, email: props.email, odjeljenja: [...props.odjeljenja]})
  }

  return (
    <li className={`${classes['document-row']} ${props.classes}`}>
      <div>{props.name}</div>
      <div>{props.last_name}</div>
      <div>{props.email}</div>
      <div>
        {props.odjeljenja.map(tag =>
          <ToolTip key={tag.id} text={tag.boja}>
            <i style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
          </ToolTip>
        )}
      </div>
      <div className={classes['options-div']}><i onClick={openEditUserHandler} className={`bx bx-edit cursor-pointer ${classes['edit-button']}`}></i><i className={`bx bxs-trash cursor-pointer ${classes['trash-button']}`}></i></div>
    </li>
  )
}

export default ListItem;