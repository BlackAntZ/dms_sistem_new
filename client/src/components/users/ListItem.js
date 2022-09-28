import classes from './ListItem.module.css';
import ToolTip from "../UI/Tooltip/ToolTip";

const ListItem = props => {
  const openEditUserHandler = (data) => {
    props.openModal(data)
  }

  return (
    props.users.map(user => {
      let liClasses = '';
      if (props.users.indexOf(user) >= +props.tableData.entries * props.tableData.selectedPage || props.users.indexOf(user) < +props.tableData.entries * (props.tableData.selectedPage - 1)) liClasses = 'display-none';
      return (
        <li key={user.id} className={`${classes['document-row']} ${liClasses}`}>
          <div>{user.korime}</div>
          <div>{user.ime}</div>
          <div>{user.prezime}</div>
          <div>{user.email}</div>
          <div>
            {user.odjeljenja.map(tag =>
              <ToolTip key={tag.id} text={tag.boja}>
                <i style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
              </ToolTip>
            )}
          </div>
          <div>
            <ToolTip key={`${user.id}-1`} text='Uredi'>
              <i onClick={() => openEditUserHandler(user)}
                 className={`bx bx-edit cursor-pointer ${classes['edit-button']}`}></i>
            </ToolTip>
            <ToolTip key={`${user.id}-2`} text='Pogledaj'>
              <i className={`bx bx-info-circle cursor-pointer ${classes['info-button']}`}></i>
            </ToolTip>
            <ToolTip key={`${user.id}-3`} text='Obrisi'>
              <i className={`bx bxs-trash cursor-pointer ${classes['trash-button']}`}></i>
            </ToolTip>
          </div>
        </li>
      )
    })
  )
}

export default ListItem;