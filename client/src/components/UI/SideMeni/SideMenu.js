import classes from "./SideMenu.module.css";
import {useRef, useState} from "react";

const SideMenu = props => {
  const sidebarMenuElement = useRef();
  const [selectedPage, setSelectedPage] = useState('home');
  // logoutButtonElement.addEventListener('click', async event => {
  //   event.preventDefault();
  //   const csrfToken = logoutButtonElement.dataset.csrf;
  //
  //   const response = await fetch('/logout' + '?_csrf=' + csrfToken, {
  //     method: 'POST'
  //   });
  //
  //   if (!response.ok) {
  //     alert('Something went wrong!');
  //     return;
  //   }
  // });

  const openSidebarHandler = () => {
    sidebarMenuElement.current['classList'].toggle(classes['sidebar-mini']);
    props.toggleSidebar();
  }

  const setAsSelectedHandler = ev => {
    if (ev.target.parentElement.dataset.name === 'home' || ev.target.dataset.name === 'home') {
      setSelectedPage('home');
    } else if (ev.target.dataset.name === 'users' || ev.target.parentElement.dataset.name === 'users') {
      setSelectedPage('users');
    }
  }

  return (
    <aside ref={sidebarMenuElement} className={`${classes['sidebar-menu']} ${classes['sidebar-mini']}`}>
      <div>
        <div onClick={openSidebarHandler} className={classes['logo']}>
          <div>DMS</div>
        </div>
      </div>
      <nav>
        <ul className={classes['side-icons']}>
          <div className={classes['main-icons']}>
            <li>
              <div className={selectedPage === 'home' ? classes['side-icons__selected'] : ''} data-name={'home'} onClick={ev => {setAsSelectedHandler(ev); props.openStartPage()}}>
                <i className='bx bxs-home'></i><span>Pocetna</span>
              </div>
            </li>
            <li>
              <div className={selectedPage === 'users' ? classes['side-icons__selected'] : ''} data-name={'users'} onClick={ev => {setAsSelectedHandler(ev); props.onOpenUsers()}}>
                <i className="fa-solid fa-users"></i><span>Korisnici</span>
              </div>
            </li>
            <li>
              <div>
                <i className='bx bx-news'></i><span>Novosti</span>
              </div>
            </li>
            <li>
              <div>
                <i className='bx bx-cog'></i><span>Postavke</span>
              </div>
            </li>
          </div>
          <li className={classes['logout-button']}>
            <div onClick={props.onLogout}>
              <i className='bx bx-log-out-circle'></i><span>Odjava</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default SideMenu;