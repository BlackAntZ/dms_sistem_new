import classes from "./UsersList.module.css";
import { useRef, useState} from "react";
import ListItem from "./ListItem";

const UsersList = props => {
  const listOfUploadedUsers = useRef();
  const [sortTerm, setSortTerm] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  const sortTableHandler = ev => {
    let tempTerm = sortTerm, tempDir = sortDir;
    if (tempTerm !== ev.target.dataset.id) tempDir = undefined;
    tempTerm = ev.target.dataset.id;
    tempDir === 1 ? tempDir = -1 : tempDir = 1;
    props.onSort(tempTerm, tempDir);
    setSortTerm(tempTerm);
    setSortDir(tempDir);
  }

  return (
    <div>
      <section>
        <div>
          <ul ref={listOfUploadedUsers} className={classes['users-list']}>
            <li>
              <div onClick={sortTableHandler} data-id="name" className='cursor-pointer'>Ime
                <div>
                  {(sortTerm === null || sortTerm !== 'name') && <i className={`bx bxs-up-arrow ${classes['normal__arrow']}`}></i>}
                  {(sortTerm === null || sortTerm !== 'name') && <i className={`bx bxs-down-arrow ${classes['normal__arrow']}`}></i>}
                  {sortTerm === 'name' && sortDir === 1 && <i className={`bx bxs-up-arrow ${classes['arrow__selected']}`}></i>}
                  {sortTerm === 'name' && sortDir === -1 && <i className={`bx bxs-down-arrow ${classes['arrow__selected']}`}></i>}
                </div>
              </div>
              <div onClick={sortTableHandler} data-id="last_name" className='cursor-pointer'>Prezime
                <div>
                  {(sortTerm === null || sortTerm !== 'last_name') && <i className={`bx bxs-up-arrow ${classes['normal__arrow']}`}></i>}
                  {(sortTerm === null || sortTerm !== 'last_name') && <i className={`bx bxs-down-arrow ${classes['normal__arrow']}`}></i>}
                  {sortTerm === 'last_name' && sortDir === 1 && <i className={`bx bxs-up-arrow ${classes['arrow__selected']}`}></i>}
                  {sortTerm === 'last_name' && sortDir === -1 && <i className={`bx bxs-down-arrow ${classes['arrow__selected']}`}></i>}
                </div>
              </div>
              <div onClick={sortTableHandler} data-id="email" className='cursor-pointer'>Email
                <div>
                  {(sortTerm === null || sortTerm !== 'email') && <i className={`bx bxs-up-arrow ${classes['normal__arrow']}`}></i>}
                  {(sortTerm === null || sortTerm !== 'email') && <i className={`bx bxs-down-arrow ${classes['normal__arrow']}`}></i>}
                  {sortTerm === 'email' && sortDir === 1 && <i className={`bx bxs-up-arrow ${classes['arrow__selected']}`}></i>}
                  {sortTerm === 'email' && sortDir === -1 && <i className={`bx bxs-down-arrow ${classes['arrow__selected']}`}></i>}
                </div>
              </div>
              <div>Odjeljenje
                <div>
                </div>
              </div>
              <div>Opcije
                <div>
                </div>
              </div>
            </li>
            {props.users.map(user => {
              let classes = '';
              if (props.users.indexOf(user) >= +props.entries * props.selectedPage || props.users.indexOf(user) < +props.entries * (props.selectedPage-1)) classes = 'display-none';
              return <ListItem openModal={props.openModal} key={user.id} classes={classes} {...user}></ListItem>
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default UsersList;