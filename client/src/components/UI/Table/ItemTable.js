import classes from "./ItemTable.module.css";
import { useRef, useState} from "react";

const UsersList = props => {
  const listOfUploadedItems = useRef();
  const [sortTerm, setSortTerm] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  const sortTableHandler = ev => {
    let tempTerm = sortTerm, tempDir = sortDir;
    if (tempTerm !== ev.target.dataset.id) tempDir = undefined;
    tempTerm = ev.target.dataset.id;
    tempDir === 1 ? tempDir = -1 : tempDir = 1;
    // props.onSort(tempTerm, tempDir);
    setSortTerm(tempTerm);
    setSortDir(tempDir);
  }

  return (
    <div>
      <section>
        <div>
          <ul ref={listOfUploadedItems} className={classes['users-list']}>
            <li style={{gridTemplateColumns: `repeat(${props.columns.length},1fr)`}}>
              {props.columns.map(column => {
                if (column.sort) {
                  return (
                    <div onClick={sortTableHandler} data-id={column.name} className='cursor-pointer'>{column.text}
                      <div>
                        {(sortTerm === null || sortTerm !== column.name) && <i className={`bx bxs-up-arrow ${classes['normal__arrow']}`}></i>}
                        {(sortTerm === null || sortTerm !== column.name) && <i className={`bx bxs-down-arrow ${classes['normal__arrow']}`}></i>}
                        {sortTerm === column.name && sortDir === 1 && <i className={`bx bxs-up-arrow ${classes['arrow__selected']}`}></i>}
                        {sortTerm === column.name && sortDir === -1 && <i className={`bx bxs-down-arrow ${classes['arrow__selected']}`}></i>}
                      </div>
                    </div>
                  )
                }
                return (<div>{column.text}<div></div></div>)
              })}
            </li>
            {props.children}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default UsersList;