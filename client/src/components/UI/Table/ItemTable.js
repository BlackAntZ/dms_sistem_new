import classes from "./ItemTable.module.css";
import {useCallback, useEffect, useState} from "react";
import EntriesAndSearch from "./EntriesAndSearch";
import PageButtons from "./PageButtons";

const ItemTable = props => {
  const [statistics, setStatistics] = useState([]);

  const {setData} = props;
  const {sortDir} = props;
  const {sortTerm} = props;
  const {items} = props;

  //Display the statistics of the presently displayed users—done
  const shownUsersStatistics = useCallback( () => {
    const transformedData = [];
    transformedData[0] = `${props.entries * (props.selectedPage - 1) + 1}`;
    transformedData[1] = `${props.entries * props.selectedPage < items.length ? props.entries * props.selectedPage : items.length}`;
    transformedData[2] = `${items.length}`;
    setStatistics(transformedData);
  },[props.selectedPage, props.entries, items]);

  useEffect(()=> {
    shownUsersStatistics();
  },[shownUsersStatistics]);

  const sortTableHandler = ev => {
    let tempTerm = sortTerm, tempDir = sortDir;
    if (tempTerm !== ev.target.dataset.id) tempDir = undefined;
    tempTerm = ev.target.dataset.id;
    tempDir === 1 ? tempDir = -1 : tempDir = 1;
    setData('sort', {dir: tempDir, term: tempTerm});
  }

  const searchHandler = val => {
    setData('search', val);
  }

  const selectEntriesHandler = entries => {
    setData('entries', entries);
  }

  const selectedPageHandler = number => {
    setData('page', number);
  }

  return (
    <div className={classes.container}>
      <EntriesAndSearch onSearch={searchHandler} entriesSelect={selectEntriesHandler} addItem={props.addItem} addText={props.addText}></EntriesAndSearch>
      <div className={classes['table_div']}>
        <div className={classes['table_item']} style={{gridTemplateColumns: `repeat(${props.columns.length + 1},1fr)`}}>
          {props.columns.map(column => {
            if (column.sort) {
              return (
                <div key={column.name} onClick={sortTableHandler} data-id={column.name} className='cursor-pointer'>{column.text}
                  <div>
                    {(sortTerm === null || sortTerm !== column.name) && <i className={`bx bxs-up-arrow ${classes['normal__arrow']}`}></i>}
                    {(sortTerm === null || sortTerm !== column.name) && <i className={`bx bxs-down-arrow ${classes['normal__arrow']}`}></i>}
                    {sortTerm === column.name && sortDir === 1 && <i className={`bx bxs-up-arrow ${classes['arrow__selected']}`}></i>}
                    {sortTerm === column.name && sortDir === -1 && <i className={`bx bxs-down-arrow ${classes['arrow__selected']}`}></i>}
                  </div>
                </div>
              )
            }
            return (<div key={column.name}>{column.text}</div>)
          })}
          <div>Opcije</div>
        </div>
        <ul className={classes['users-list']}>
          {props.children}
        </ul>
      </div>
      <PageButtons statistics={statistics} entries={props.entries} selectedPage={props.selectedPage} users={items} onSelect={selectedPageHandler}></PageButtons>
    </div>
  )
}

export default ItemTable;