import classes from './TaskItem.module.css';

const ListItem = props => {
  const openEditTask = () => {
    console.log('open modal');
  }

  return (
    <li style={{gridTemplateColumns: `repeat(${props.columns},1fr)`}} className={`${classes['document-row']} ${props.classes}`}>
      <div>{props.naziv}</div>
      <div>{props.status}</div>
      <div className={classes['options-div']}><i onClick={openEditTask} className={`bx bx-edit cursor-pointer ${classes['edit-button']}`}></i><i className={`bx bxs-trash cursor-pointer ${classes['trash-button']}`}></i></div>
    </li>
  )
}

export default ListItem;