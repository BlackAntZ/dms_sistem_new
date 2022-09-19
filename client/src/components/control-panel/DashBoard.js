import classes from "./DashBoard.module.css";
import {useCallback, useEffect, useState} from "react";
import AddNewTagModal from "../UI/Modal/AddNewTagModal";
import TagList from "./TagList";
import ItemTable from "../UI/Table/ItemTable";

const DashBoard = () => {
  const [odjeljenja, setOdjeljenja] = useState([]);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(0);
  const [tagAdded, setTagAdded] = useState(false);

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

    return await response.json();
  },[])



  const fillTagsData = useCallback(data => {
    setOdjeljenja(data);
  },[]);

  useEffect(()=>{
    fetchOdjeljenja().then(r => {
      if (!r[0]) return console.log('Nema odjeljenja');
      fillTagsData(r);
    })
  },[fillTagsData, fetchOdjeljenja, tagAdded])

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

  return (
    <>
      {openTagModal && <AddNewTagModal onAdd={tagAddedHandler} tag={selectedTag} closeModal={closeTagModalHandler}></AddNewTagModal>}
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
        <div>
          <h3>Spisak zadataka</h3>
          <ItemTable columns={[{id: '1', name: 'name', sort: true, text: 'Naziv'},{id: '2', name: 'broj_datoteka', sort: true, text: 'Broj datoteka'},{id: '3', sort: false, text: 'Opcije'}]}>

          </ItemTable>
        </div>
      </div>
    </>
  )
}

export default DashBoard;