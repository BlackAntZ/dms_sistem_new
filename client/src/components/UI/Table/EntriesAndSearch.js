import classes from './EntriesAndSearch.module.css';
import {useRef} from "react";
import Button from "../Button/Button";

const EntriesAndSearch = props => {
  const tableSearchBarElement = useRef();
  const entriesSelectElement = useRef();


  const entriesChangeHandler = () => {
    props.entriesSelect(entriesSelectElement.current["value"]);
  }

  const searchBarInputHandler = () => {
    props.onSearch(tableSearchBarElement.current["value"]);
  }

  return (
    <div className={classes['entries-div']}>
      <label htmlFor="entries">
        Prikazi
        <select onChange={entriesChangeHandler} ref={entriesSelectElement} name="entries" id="entries">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        korisnika:
      </label>
      <div>
        <label htmlFor="table-search">Brza pretraga:</label>
        <input onChange={searchBarInputHandler} ref={tableSearchBarElement} type="text" id="table-search" name="table-search"></input>
      </div>
      <div>
        <Button open={props.addItem} type={'button'}>{props.addText}</Button>
      </div>
    </div>
  )
}

export default EntriesAndSearch;