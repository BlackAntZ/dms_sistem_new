import classes from "./DashBoard.module.css";
import {useCallback, useEffect, useState} from "react";
import AddNewTagModal from "../UI/Modal/AddNewTagModal";

const DashBoard = () => {
  const [odjeljenja, setOdjeljenja] = useState([]);
  const [openTagModal, setOpenTagModal] = useState(false);
  // const tagList = document.querySelector('.tag_list');
  // const odjeljenja = document.querySelector('.odjeljenja');
  // const tree = document.querySelector('.tree');
  // const child = document.getElementById('child');
  // const parent = document.getElementById('parent');
  // const odjeljenjeNaziv = document.getElementById('odjeljenje');

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

    // const treeview = document.querySelectorAll('ul.treeview a:not(:last-child)');
    //
    // for(let i = 0; i < treeview.length; i++){
    //   treeview[i].addEventListener('click', function(e) {
    //     const parent = e.target.parentElement;
    //     const classList = parent.classList;
    //     if(classList.contains("open")) {
    //       classList.remove('open');
    //       const opensubs = parent.querySelectorAll(':scope .open');
    //       for(let i = 0; i < opensubs.length; i++){
    //         opensubs[i].classList.remove('open');
    //       }
    //     } else {
    //       classList.add('open');
    //     }
    //   });
    // }
  },[])

  const fillTagsData = useCallback(data => {
    setOdjeljenja(data);
  },[]);

  useEffect(()=>{
    fetchOdjeljenja().then(r => {
      if (!r[0]) return console.log('Nema odjeljenja');
      fillTagsData(r);
    })
  },[fillTagsData, fetchOdjeljenja])

  //Dodaj novo odjeljenje
  // async function dodajOdjeljenje(){
  //   let response;
  //   response = await fetch(`/dashboard`,{
  //     method: 'POST',
  //     body: JSON.stringify({
  //       parent: $('#parent').val(),
  //       naziv: $('#naziv').val(),
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //
  //   if(!response.ok){
  //     console.log('Nesto nije u redu');
  //   }
  //
  //   // const responseData = await response.json();
  //   // console.log(responseData);
  // }

  //Inicijalizacija DataTable
  // let dt = $('#zadaci').DataTable({
  //   columns: [
  //     {
  //       data: 'naziv',
  //       name: 'naziv',
  //       title: 'Naziv'
  //     },
  //   ],
  //   language: {
  //     emptyTable: 'Nema dostupnih podataka'
  //   },
  //   ajax: {
  //     type: 'get',
  //     url: '/dashborad/odjeljenja',
  //     contentType: 'application/json; charset=utf-8',
  //     dataType: 'json',
  //     dataSrc: ''
  //   }
  // });

  const openTagModalHandler = () => {
    setOpenTagModal(true);
  }

  const closeTagModalHandler = () => {
    setOpenTagModal(false);
  }

  return (
    <>
      {openTagModal && <AddNewTagModal closeModal={closeTagModalHandler}></AddNewTagModal>}
      <div className={classes['logged_user']}>
        <span>Aktivni korisnik</span>
      </div>
      <div className={classes['container']}>
        <div className={classes['top_section']}>
          <div className={`${classes['tag_list']} ${classes['box_shadow']}`}>
            <div className={classes['add_new_tag']}>
              <button onClick={openTagModalHandler} id="add_tag" className={classes['add_tag']}><i className='bx bxs-purchase-tag'></i></button>
            </div>
            <ul className={classes.odjeljenja}>
              <li>
                <i className='bx bx-home'></i>
              </li>
            </ul>
            <ul className={classes['tree']}>
              {odjeljenja && odjeljenja.map(odjeljenje => {return <li key={odjeljenje.id}><i className="fa-solid fa-tags"></i>{odjeljenje.naziv}</li>})}
            </ul>
          </div>

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
          <table id="zadaci"></table>
        </div>
      </div>
    </>
  )
}

export default DashBoard;