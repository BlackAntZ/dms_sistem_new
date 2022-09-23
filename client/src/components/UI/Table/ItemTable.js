import classes from "./ItemTable.module.css";
import {useCallback, useEffect, useState} from "react";
import EntriesAndSearch from "./EntriesAndSearch";
import PageButtons from "./PageButtons";

const ItemTable = props => {
  const [sortTerm, setSortTerm] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState('10');
  const [selectedPage, setSelectedPage] = useState(1);
  const [items, setItems] = useState(props.items);

  //Function for sorting the table when the sort term inputted
  const filterListBySearchTerm = useCallback((array) => {
    const regexp = new RegExp(searchTerm, 'gi');
    return array.filter(user => {
      if (user.name.match(regexp) || user.last_name.match(regexp) || user.email.match(regexp)) return user;
      return null;
    });
  },[searchTerm]);

  //Display the statistics of the presently displayed users—done
  const shownUsersStatistics = useCallback((array, entries) => {
    const transformedData = [];
    transformedData[0] = `${entries * (selectedPage - 1) + 1}`;
    transformedData[1] = `${entries * selectedPage < array.length ? entries * selectedPage : array.length}`;
    transformedData[2] = `${array.length}`;
    setStatistics(transformedData);
  },[selectedPage]);

  //Fill the table with users and sort if the sort term inputted.
  const fillItemsData = useCallback((array, data) => {
    let list;
    (data.searchTerm  ? data.searchTerm : searchTerm.length) === 0 ? list = array : list = filterListBySearchTerm(array);

    shownUsersStatistics(list, data.entries ? data.entries : entries);
    setFilteredItems(list);
  },[entries, searchTerm, filterListBySearchTerm, shownUsersStatistics]);

  useEffect(()=> {
    fillItemsData(items, {});
  },[])

  //Sort users upon sort term selection - done
  function sortItems (sortTerm, sortDir) {
    setItems(prevState => {return prevState.sort((a,b) => {
      return (a[sortTerm] > b[sortTerm]) ? -1 * sortDir : ((b[sortTerm] > a[sortTerm]) ? 1 * sortDir : 0);
    })})
  }

  const sortTableHandler = ev => {
    let tempTerm = sortTerm, tempDir = sortDir;
    if (tempTerm !== ev.target.dataset.id) tempDir = undefined;
    tempTerm = ev.target.dataset.id;
    tempDir === 1 ? tempDir = -1 : tempDir = 1;
    sortItems(tempTerm, tempDir);
    setSortTerm(tempTerm);
    setSortDir(tempDir);
  }

  const searchHandler = val => {
    setSearchTerm(val);
    fillItemsData(items, {searchTerm: val})
  }

  const selectEntriesHandler = entries => {
    setEntries(entries);
    props.onSelectEntries(entries);
    setSelectedPage(1);
    fillItemsData(items, {entries: entries});
  }

  const selectedPageHandler = number => {
    props.onPageSelect(number);
    setSelectedPage(number);
  }

  return (
    <div className={classes.container}>
      <EntriesAndSearch onSearch={searchHandler} entriesSelect={selectEntriesHandler}></EntriesAndSearch>
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
      {filteredItems && <PageButtons statistics={statistics} entries={entries} selectedPage={selectedPage} users={filteredItems}
                                     onSelect={selectedPageHandler}></PageButtons>}
    </div>
  )
}

export default ItemTable;