import classes from "./DashBoard.module.css";
import {useCallback, useEffect, useState} from "react";
import AddNewTagModal from "../UI/Modal/Tag/AddNewTagModal";
import TagList from "./TagList";
import ItemTable from "../UI/Table/ItemTable";
import Button from "../UI/Button/Button";
import AddNewTaskModal from "../UI/Modal/Task/AddNewTaskModal";
import TaskItem from "./TaskItem";

const DashBoard = () => {
  const [odjeljenja, setOdjeljenja] = useState([]);
  const [zadaci, setZadaci] = useState([]);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(0);
  const [tagAdded, setTagAdded] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const fetchOdjeljenja = useCallback(async () => {
    let response;
    try {
      response = await fetch('/main');
    } catch (error) {
      console.log(error);
      return;
    }

    if(!response.ok){
      console.log('Nije moguce povuci podatke iz baze');
    }

    const parsed = await response.json();
    if (!parsed[0]) return 'Nema odjeljenja';

    setOdjeljenja(parsed);
  },[]);

  const fetchZadaci = useCallback(async () => {
    let response;
    try {
      response = await fetch('/admin/task');
    } catch (error) {
      console.log(error);
      return;
    }

    if(!response.ok){
      console.log('Nije moguce povuci podatke iz baze');
    }

    const parsed = await response.json();
    if (!parsed[0]) return 'Nema zadataka';

    setZadaci(parsed);
  },[]);

  useEffect(()=>{
    fetchOdjeljenja().then(r => console.log(r || ''))
  },[fetchOdjeljenja, tagAdded]);

  useEffect(()=>{
    fetchZadaci().then(r => console.log(r || ''))
  },[fetchZadaci, taskAdded]);

  const openTagModalHandler = () => {
    setOpenTagModal(true);
  }

  const closeTagModalHandler = () => {
    setOpenTagModal(false);
  }

  const selectTagHandler = id => {
    setSelectedTag(id);
  }

  const tagAddedHandler = () => {
    setTagAdded(prevState => !prevState);
  }

  const taskAddedHandler = () => {
    setTaskAdded(prevState => !prevState);
  }

  const openAddNewTaskModalHandler = () => {
    setOpenTaskModal(true);
  }

  const closeAddNewTaskModalHandler = () => {
    setOpenTaskModal(false);
  }

  return (
    <>
      {openTagModal && <AddNewTagModal onAdd={tagAddedHandler} tag={selectedTag} closeModal={closeTagModalHandler}></AddNewTagModal>}
      {openTaskModal && <AddNewTaskModal onAdd={taskAddedHandler} closeModal={closeAddNewTaskModalHandler}></AddNewTaskModal>}
      <div className={classes['logged_user']}>
        <span>Aktivni korisnik</span>
      </div>
      <div className={classes['container']}>
        <div className={classes['top_section']}>
          {odjeljenja && odjeljenja.length > 0 && <TagList onAddTag={openTagModalHandler} onSelect={selectTagHandler} odjelenja={odjeljenja}></TagList>}
          <div className={`${classes['recent_used']} ${classes['box_shadow']}`}>
            <div className={classes['recent_buttons']}>
              <div className={classes['config']}>
                <i className='bx bx-cog'></i>
              </div>
              <button className={classes['btn-primary']}>
                <i className='bx bxs-file-doc'></i>
                Dozvole
              </button>
              <button className={classes['btn-primary']}>
                <i className='bx bxs-spreadsheet'></i>
                Ugovori
              </button>
              <button className={classes['btn-primary']}>
                <i className='bx bx-line-chart'></i>
                Troškovi
              </button>
              <button className={classes['btn-primary']}>
                <i className='bx bxs-news'></i>
                Fakture
              </button>
            </div>
            <div>
              <h3>Zadaci</h3>
              <div className={classes['date_picker']}>
                <span>Od: <input type="date" /></span>
                <span>Do: <input type="date" /></span>
                <button className={classes['btn-primary']}>
                  <i className='bx bx-search-alt-2'></i>Prikaži
                </button>
              </div>
            </div>
            <div className={classes['task_preview']}>
              <div className={`${classes['tasks']} ${classes['undone']}`}>
                <div className={classes['middle']}>
                  <div className={classes['left']}>
                    <h5>Nezavršeni</h5>
                    <h3 id="done-tasks">0</h3>
                  </div>
                </div>
              </div>
              <div className={`${classes['tasks']} ${classes['done']}`}>
                <div className={classes['middle']}>
                  <div className={classes['left']}>
                    <h5>Završeni</h5>
                    <h3 id="done-tasks">0</h3>
                  </div>
                </div>
              </div>
              <div className={`${classes['tasks']} ${classes['all']}`}>
                <div className={classes['middle']}>
                  <div className={classes['left']}>
                    <h5>Ukupno</h5>
                    <h3 id="done-tasks">0</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className={classes['table_section']}>
          <div>
            <h3>Spisak zadataka</h3>
            <Button open={openAddNewTaskModalHandler} type={'submit'}>Dodaj Novi Zadatak</Button>
          </div>
          <ItemTable columns={[{id: '1', name: 'name', sort: true, text: 'Naziv'},{id: '2', name: 'broj_datoteka', sort: true, text: 'Broj datoteka'},{id: '3', sort: false, text: 'Opcije'}]}>
            {zadaci && zadaci.map(zadatak => {
              return <TaskItem key={zadatak.id} naziv={zadatak.naziv} status={zadatak.status} columns={'3'}></TaskItem>
            })}
          </ItemTable>
        </section>
      </div>
    </>
  )
}

export default DashBoard;